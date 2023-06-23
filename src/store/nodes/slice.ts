import {
    Node,
    Edge,
    Position,
    applyNodeChanges,
} from 'reactflow';

import { modifyOptions } from '../../constants/modifyOptions';
import { nodeInitialState } from '../../constants/nodeInitialState';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface INodes extends Node {
    data: {
        placeholder: string;
        selectedValues: string[];
    };
}

interface IInitialState {
    nodes: INodes[];
    edges: Edge[];
}

const initialState: IInitialState = {
    nodes: [nodeInitialState],
    edges: [],
};

export const nodesSlice = createSlice({
    name: 'nodes',
    initialState,
    reducers: {
        addNode: (state, actions: PayloadAction<{ str: string[]; id: string }>) => {
            const nodeIds = actions.payload.str.map((el) => el.split(' ')[1]);
            const edgeIds = nodeIds.map((id) => `${state.nodes.length}-${id}`);
            const currentNode = state.nodes.find(
                (node) => node.id === actions.payload.id,
            );
        
            const nodeSpacing = 250;
        
            const newNode = nodeIds.map((id, index) => ({
                id,
                type: 'CustomNode',
                position: {
                    x: currentNode
                        ? currentNode.position.x + (index + 1) * nodeSpacing
                        : 0,
                    y: currentNode ? currentNode.position.y + 190 : 0,
                },
                targetPosition: Position.Top,
                data: {
                    options: modifyOptions(actions.payload.str[index].split(' ')[1]),
                    placeholder: 'Choose an option',
                    selectedValues: [],
                },
            }));
        
            const newEdge = edgeIds.map((id, index) => ({
                id,
                source: actions.payload.id,
                target: `${nodeIds[index]}`,
            }));
        
            state.nodes = [...state.nodes, ...newNode];
            state.edges = [...state.edges, ...newEdge];
        },
        removeNode(state, action: PayloadAction<string>) {
            const nodeId = action.payload;
            const removeNode = state.nodes.find((node) => node.id === nodeId);

            if (removeNode) {
                const nodeIdsToRemove: string[] = [];
                const edgeIdsToRemove: string[] = [];

                const traverseBranch = (nodeId: string) => {
                    const nodeIndex = state.nodes.findIndex((node) => node.id === nodeId);

                    if (nodeIndex !== -1) {
                        nodeIdsToRemove.push(state.nodes[nodeIndex].id);

                        const connectedEdges = state.edges.filter(
                            (edge) => edge.source === nodeId,
                        );

                        connectedEdges.forEach((edge) => {
                            const edgeIndex = state.edges.findIndex(
                                (e) => e.source === edge.source && e.target === edge.target,
                            );
                            if (edgeIndex !== -1) {
                                edgeIdsToRemove.push(state.edges[edgeIndex].id);
                                traverseBranch(edge.target);
                            }
                        });
                    }
                };

                traverseBranch(nodeId);

                state.nodes = state.nodes.filter(
                    (node) => !nodeIdsToRemove.includes(node.id),
                );
                state.edges = state.edges.filter(
                    (edge) => !edgeIdsToRemove.includes(edge.id),
                );
            }
        },
        nodeChanged(state, actions) {
            state.nodes == applyNodeChanges(actions.payload, state.nodes);
        },
        setSelectedValues(state, actions) {
            const currentNode = state.nodes.find(
                (node) => node.id === actions.payload.id,
            );
            if (currentNode) {
                currentNode.data.selectedValues = actions.payload.updatedSelectedValues;

                const restNodes = state.nodes.filter(
                    (node) => node.id !== actions.payload.id,
                );

                state.nodes = [...restNodes, currentNode];
            }
        },
    },
});

export const { addNode, nodeChanged, removeNode, setSelectedValues } = nodesSlice.actions;

export default nodesSlice.reducer;

