export function to_upper(text){
    let new_text = ''

    for(let caractere of text){
        if(eh_letra_minuscula(caractere)){
            const code_ascii = caractere.charCodeAt()
            const new_code = code_ascii - 32
            const new_caractere = String.fromCharCode(new_code)

            new_text = new_text + new_caractere
        }else{
            new_text = new_text + caractere
        }
    }

    return new_text
}

export function eh_letra_minuscula(letra){
    const code = letra.charCodeAt(0)

    return (code >= 97 && code <= 122)
}

export function to_lower(text){
    let new_text = ''

    for(let caractere of text){
        if(eh_letra_maiuscula(caractere)){
            const code_ascii = caractere.charCodeAt()
            const new_code = code_ascii + 32
            const new_caractere = String.fromCharCode(new_code)

            new_text = new_text + new_caractere
        }else{
            new_text = new_text + caractere
        }
    }

    return new_text
}

export function eh_letra_maiuscula(letra){
    const code = letra.charCodeAt(0)

    return (code >= 65 && code <= 90)
}

export function contem_letra(letra_procurada, palavra){
    for(let letra of palavra){
        if(to_lower(letra) === to_lower(letra_procurada)){
            return true
        }
    }

    return false
}

export function code_ascii(char){
    return char.charCodeAt()
}