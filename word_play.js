import { enter_to_continue, get_number, get_text, print } from '../../utils/inputs.js'
import { readFileSync } from 'fs'
import { to_upper, to_lower, code_ascii } from '../../utils/strings.js'

function main(){
    const palavras = load_palavras()
    const qtd_palavras = palavras.length

    let opcao = get_number(menu(qtd_palavras))

    while(opcao !== 0){

        if(opcao === 1){
            mostrar_palavras_com_20_mais_letras(palavras)
        }
        else if(opcao === 2){
            mostrar_palavras_sem_letra_e(palavras, qtd_palavras)
        }
        else if(opcao === 3){
            palavras_sem_letras_proibidas(palavras)
        }
        else if(opcao === 4){
            mostar_palavras_que_usam_somente(palavras)
        }
        else if(opcao === 5){
            mostrar_palavras_que_usam_letras_especificadas(palavras)
        }
        else if(opcao === 6){
            mostrar_palavras_em_ordem_alfabetica(palavras)
        }

        enter_to_continue()
        opcao = get_number(menu(qtd_palavras))
    }
}


function load_palavras(){
    const arquivo = readFileSync('palavras.txt', 'utf-8')
    const palavras = arquivo.split('\n')
  
    return palavras
}

function mostrar_palavras_com_20_mais_letras(palavras){
    let contador = 0
    for(let palavra of palavras){
        if(palavra.length > 20){
            print(palavra)
            contador++
        }
    }

    print(`Foram encontradas ${contador} palavras com mais de 20 letras. `)
}

function mostrar_palavras_sem_letra_e(palavras, qtd_palavras){
    let palavras_sem_E = 0
    for(let palavra of palavras){
        if(has_no_e(palavra)){
            print(palavra)
            palavras_sem_E++
        }
    }

    const porcentagem_palavras_sem_E = (palavras_sem_E / qtd_palavras) * 100

    print(`
    \n--------------------
    > porcentagem de palavras sem a letra 'e' : ${porcentagem_palavras_sem_E.toFixed(1)} %`)

        function has_no_e(palavra){
            let qtd_letras_E = 0
            
            for(let caractere = 0 ; caractere < palavra.length ; caractere++){
                const letra = palavra[caractere]
            
                if(letra === 'e'){
                    qtd_letras_E++
                }
            }

            return qtd_letras_E === 0
        }

}

function receber_letras(label){
    const entrada_letras = get_text(label)
    const letras = []

    for(let letra of entrada_letras){
        if(letra !== ' '){
        letras.push(letra)
        }
    }

    return letras
}

function palavras_sem_letras_proibidas(palavras){
    const letras_proibidas = receber_letras('> Digite as letras proibidas (ex: a b c): ')

    let palavras_sem_letra_proibida = 0
    
        for(let palavra of palavras){
            if(avoids(palavra, letras_proibidas)){
                print(palavra)
                palavras_sem_letra_proibida++
            }
        }
    print(`Foram encontradas ${palavras_sem_letra_proibida} palavras sem as letras (${letras_proibidas})`)

            function avoids(palavra, letras_proibidas){
                for(let letra_proibida of letras_proibidas){
                    if(esta_na_palavra(letra_proibida, palavra)){
                        return false
                    }
                }

                return true 
            }

            function esta_na_palavra(letra_procurada, palavra){
                for(let letra of palavra){
                    if(to_lower(letra) === to_lower(letra_procurada)){
                        return true
                    }
                }

                return false
            }
}


function mostar_palavras_que_usam_somente(palavras){
    const letras_exclusivas = receber_letras('> Digite as letras que quer (ex: a b c): ')

        for(let palavra of palavras){
            if(uses_only(palavra, letras_exclusivas)){
                print(palavra)
            }
        }

            function uses_only(palavra, letras_exclusivas){
                let letras_diferentes = 0
            
                for(let caractere of palavra){
                    if(nao_eh_igual_a_nenhuma(caractere, letras_exclusivas)){
                        letras_diferentes++
                    }
                }
            
                return letras_diferentes === 0
            
                    function nao_eh_igual_a_nenhuma(caractere, letras_exclusivas){
                        let letras_iguais = 0
                    
                        for(let letra of letras_exclusivas){
                            if(letra === caractere){
                                letras_iguais++
                            }
                        }
                    return letras_iguais === 0

                    }
            }
}

function mostrar_palavras_que_usam_letras_especificadas(palavras){
    const letras_especificadas = receber_letras('Quais letras voce quer ? ')
    
    let palavras_que_usam_todas_as_letras = 0

        for(let palavra of palavras){
            if(uses_all(palavra, letras_especificadas)){
                print(palavra)
                palavras_que_usam_todas_as_letras++
            }
        }

    print(`Foram encontras ${palavras_que_usam_todas_as_letras} que usam todas as letras (${letras_especificadas})`)

            function uses_all(palavra, letras_especificadas){
                let letras_usadas = 0

                for(let letra of letras_especificadas){
                    if(eh_igual_a_algum_char(letra, palavra)){
                        letras_usadas++
                    }
                }

                return letras_usadas === letras_especificadas.length
            }

                function eh_igual_a_algum_char(letra, palavra){
                    let caracteres_iguais_a_letra = 0

                    for(let caractere of palavra){
                        if(letra === caractere){
                            caracteres_iguais_a_letra++
                        }
                    }

                    return caracteres_iguais_a_letra > 0
                }
}

function mostrar_palavras_em_ordem_alfabetica(palavras){
    let contador = 0

    for(let palavra of palavras){
        if(is_abecedarian(palavra)){
            print(palavra)
            contador++
        }
    }

    print(`Foram encontras ${contador} que estao em ordem alfabetica`)

    function is_abecedarian(palavra){
        
        for(let i = 0; i < (palavra.length - 1); i++){
            let letra_atual = to_lower(palavra[i])
            let proxima = to_lower(palavra[i + 1])

            if( code_ascii(letra_atual) >  code_ascii(proxima) ){
                return false
            }
        }

        return true
    }
}


function menu(qtd_palavras){
    const label = `
    '***************** WORDPLAY ******************'

    > ${qtd_palavras} Palavras lidas
    ----------------------------------------------
    ( 1 ) - Mostrar palavras com mais de 20 letras.

    ( 2 ) - Mostrar palavras sem a letra 'e'.

    ( 3 ) - Mostrar quantas palavras nao tem letras proibidas.

    ( 4 ) - Mostrar palavras que so usam letras especificadas.

    ( 5 ) - Mostrar palavras que usam todas as letras especificadas.

    ( 6 ) - Mostrar palavras que estao escritas em ordem alfabetica.
  
    ( 0 ) - Sair

    >>> `

    return label
}

main()