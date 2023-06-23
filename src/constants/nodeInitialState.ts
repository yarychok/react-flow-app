import { modifyOptions } from "./modifyOptions";

export const nodeInitialState = {
    id: '0',
    type: 'CustomNode',
    position: { x: 50, y: 50},
    data: {
        options: modifyOptions(),
        placeholder: 'Choose an option',
        selected: false,
        selectedValues: []
    },
};