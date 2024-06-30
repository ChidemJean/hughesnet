export function moneyToDecimal(number)
{
    number = Number(number.replace('R$ ', '').replace(',', '.'));
    console.log(number);
    return number;
}

export function numberFormat(number, decimals = 0, decPoint = '.', thousandsSep = ',') {
    // Usando Intl.NumberFormat para formatar o número
    const options = {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    };

    const formatter = new Intl.NumberFormat('en-US', options);
    let formattedNumber = formatter.format(number);

    // Substituindo o ponto decimal e o separador de milhar, se necessário
    if (decPoint !== '.' || thousandsSep !== ',') {
        const parts = formattedNumber.split('.');
        parts[0] = parts[0].split(',').join(thousandsSep);
        if (parts[1]) {
            parts[1] = parts[1].split('.').join(decPoint);
        }
        formattedNumber = parts.join(decPoint);
    }

    return formattedNumber;
}

export function decimalToMoney(value) {
    return `R$ ${numberFormat(value, 2, ',', '')}`;
}

export function getZodErrorMessage(error) {
    const message = error.message;
    const parsedMessage = JSON.parse(message);
    const zodError = parsedMessage[0];
    if (!zodError) throw Error("Zod is broken");
    return zodError.message;
}

/**
 * Formata o tamanho de um arquivo em uma representação legível.
 * 
 * @param {number} bytes - O tamanho do arquivo em bytes.
 * @param {number} decimals - O número de casas decimais a ser exibido.
 * @returns {string} O tamanho formatado do arquivo.
 */
export function formatFileSize(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function formatFileType(type) {
    let name = type.split('/')[1];
    return name;
}

export function baseUrl() {
    const baseUrl = window.location.protocol + '//' + window.location.host;
    return baseUrl;
}

export function formatUrl(url) {
     // Remove barras duplicadas
     const cleanedUrl = url.replace(/\/{2,}/g, '/');
    
     // Substitui barras invertidas por barra normal
     const formattedUrl = cleanedUrl.replace(/\\/g, '/');
     
     return formattedUrl;
}

export function replaceLastCommaWithAnd(str) {
    // Encontra a última ocorrência de uma vírgula
    const lastCommaIndex = str.lastIndexOf(',');
  
    // Se não houver vírgula, retorna a string original
    if (lastCommaIndex === -1) {
      return str;
    }
  
    // Divide a string em duas partes: antes e depois da última vírgula
    const beforeLastComma = str.substring(0, lastCommaIndex);
    const afterLastComma = str.substring(lastCommaIndex + 1);
  
    // Retorna a string com a última vírgula substituída por ' e'
    return beforeLastComma + ' e' + afterLastComma;
  }