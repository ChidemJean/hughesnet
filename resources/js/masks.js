export const document_mask = {
    mask: [
        {
            mask: '000.000.000-00'
        },
        {
            mask: '00.000.000/0000-00'
        }
    ]
};

export const money_mask = {
    mask: [
        {
            mask: 'R$ num{,}`cents',
            blocks: {
              num: {
                mask: Number,
                signed: true,
                scale: 0
              },
              cents: {
                mask: '`0`0',
                normalizeZeros: true,
                padFractionalZeros: true,
              }
            },
            overwrite: true
        }
    ]
};