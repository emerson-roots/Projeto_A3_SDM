import sgdb from '../../database/sgdb.js'
import auth from '../auth.js'

function cria_rotas(app, nome_rota, nome_base) {

    // rota GET ALL sem autenticação
    app.get(nome_rota, function (req, res) {
        res.json(sgdb.db[nome_base])
    })

    // rota GET/ID sem autenticação
    app.get(nome_rota + '/:id', function (req, res) {
        let jogo = sgdb.db[nome_base][req.params.id]
        if (jogo == undefined) {
            res.json("Pergunta não encontrada...")
            return;
        }
        res.json(jogo)
    })

    // VERIFICA RESPOSTA
    app.post(nome_rota + '/verifica_resposta/:id', function (req, res) {

        let pergunta = sgdb.db[nome_base][req.params.id]
        if (pergunta == undefined) {
            res.json("Pergunta não encontrada...")
            return;
        }

        let respostas = req.body;
        let isCorreta = verificaRespostaCorreta(pergunta, respostas);
        res.json(isCorreta)
    })

    // POST nova pergunta com AUTH/TOKEN
    app.route(nome_rota).post(auth.middlewareAuth, function (req, res) {

        let json = new Object(req.body);
        let proximoId = getProximoId();
        json.id = proximoId;
        if (sgdb.db[nome_base][json.id] != undefined) {
            res.status(400).send('ERRO: ID já existe!')
        } else {
            sgdb.db[nome_base][proximoId.toString()] = json;
            sgdb.write()
            res.status(200).json('Pergunta inserida com sucesso - Id gerado: '+ proximoId)
        }
    })

    //PUT com AUTH/TOKEN
    app.route(nome_rota + '/:id').put(auth.middlewareAuth, function (req, res) {
        
        if (sgdb.db[nome_base][req.params.id] == undefined) {
            res.status(400).send('ERRO: ID não existe!')
        } else {
            if (req.body.id != req.params.id) {
                res.status(400).send('ERRO: ID diferentes!')
            } else {
                sgdb.db[nome_base][req.params.id] = req.body
                sgdb.write()
                res.status(200).json(req.body)
            }
        }
    })

    // deleta com AUTH/TOKEN
    app.route(nome_rota + '/:id').delete(auth.middlewareAuth, function (req, res) {
        if (sgdb.db[nome_base][req.params.id] == undefined) {
            res.status(400).send('ERRO: ID não existe!')
        } else {
            let obj = sgdb.db[nome_base][req.params.id]
            delete sgdb.db[nome_base][req.params.id]
            sgdb.write()
            res.status(200).json(obj)
        }
    })

    // gera um ID incremental
    function getProximoId() {
        let nomeDataBase = 'IDs';

        let listIds = sgdb.db[nomeDataBase];
        let ultimoId = Object.keys(listIds)[Object.keys(listIds).length - 1];

        let proximoId = parseInt(ultimoId) + 1;
        var jsonObj = new Object();
        jsonObj.id = proximoId;

        // insere no banco de dados 
        sgdb.db[nomeDataBase][proximoId.toString()] = jsonObj
        sgdb.write()

        return proximoId;
    }

    // gera um ID incremental
    function verificaRespostaCorreta(pergunta, resposta) {
        
        let alternativa_a = resposta.answer_a_correct == pergunta.correct_answers.answer_a_correct;
        let alternativa_b = resposta.answer_b_correct == pergunta.correct_answers.answer_b_correct;
        let alternativa_c = resposta.answer_c_correct == pergunta.correct_answers.answer_c_correct;
        let alternativa_d = resposta.answer_d_correct == pergunta.correct_answers.answer_d_correct;
        let alternativa_e = resposta.answer_e_correct == pergunta.correct_answers.answer_e_correct;

        let isRespostaCorreta = 'null';
        if (alternativa_a && alternativa_b && alternativa_c && alternativa_d && alternativa_e) {
            isRespostaCorreta = "Parabéns, resposta correta!!!"
        } else {
            isRespostaCorreta = "Resposta incorreta. Tente novamente."
        } 

        return isRespostaCorreta;
    }
}

export default cria_rotas 