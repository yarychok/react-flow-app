import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { MultiSelect } from './MultiSelect';

const CustomNode: React.FC<NodeProps> = ({ id, data, isConnectable }) => {
    return (
        <div className={`custom-node ${data.selected ? 'selected' : ''}`} id={id}>
        {id !== '0' && (
            <Handle
            type="target"
            position={Position.Top}
            isConnectable={isConnectable}
            />    
        )}
        <div className="node-header">{data.label}</div>
        <div className="node-content">
            <textarea className="node-textarea" />
            <MultiSelect
            options={data.options}
            selectedValues={data.selectedValues}
            placeholder={data.placeholder}
            id={id}
            />    
        </div>
        <Handle
            type="source"
            position={id === '0' ? Position.Right : Position.Bottom}
            style={id === '0' ? { top: 116 } : { top: 'none' }}
            isConnectable={isConnectable}
        />
    </div>
    );
    };    

export default CustomNode