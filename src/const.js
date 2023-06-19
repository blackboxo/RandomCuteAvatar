export const AvatarTypes = ['kaki', 'elephant', 'bee', 'pelican']

export const StyleList = {
    'kaki': ['0-background', '1-body', '2-hat', '3-clothes', '4-emoji', '5-hand'],
    'elephant': [
        'background', 'cup_down', 'body', 'clothes', 'cup_up', 'glass', 'hand', 'hat']
}

export const StyleCount = {
    'kaki': {
        '0-background': 6,
        '1-body': 6,
        '2-hat': 6,
        '3-clothes': 6,
        '4-emoji': 7,
        // '5-hand': 45,
    },
    'elephant': {
        background: 5,
        body: 5,
        clothes: 5,
        cup_down: 5,
        cup_up: 5,
        glass: 5,
        hand: 5,
        hat: 5,
    }
};

export const StyleMatch = {
    'kaki': {
        '5-hand': {
            'layer': '1-body', 'rule': [
                [0, 6, 12, 18, 24, 30, 33, 39],
                [1, 7, 13, 19, 25, 31, 34, 40],
                [2, 8, 14, 20, 26, 32, 35, 41],
                [3, 9, 15, 21, 27, 36, 42],
                [4, 10, 16, 22, 28, 37, 43],
                [5, 11, 17, 23, 29, 38, 44],
            ]
        }
    }
}
