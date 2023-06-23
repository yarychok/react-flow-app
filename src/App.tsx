import React from 'react';
import { useSelector } from 'react-redux';
import ReactFlow, { OnNodesChange } from 'reactflow';
import CustomNode from './components/CustomNode';
import { RootState, useAppDispatch } from './store/store';
import { nodeChanged } from './store/nodes/slice';

import 'reactflow/dist/style.css';
import './App.css';


const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { nodes, edges } = useSelector((state: RootState) => state.nodes);

  const nodeTypes = React.useMemo(() => ({CustomNode: CustomNode}), []);

  const onNodesChange: OnNodesChange = React.useCallback(
    (changes) => dispatch(nodeChanged(changes)), 
    [dispatch],
  );

  return (
    <div className='app' style={{width: '100vw', height: '100vh'}}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
      />
    </div>
  )
}
export default App;

// ReactFlow Quickstart

// const initialNodes = [
//   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//   { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
// ];
// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

// export default function App() {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

//   const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//       >
//         <Controls />
//         <MiniMap />
//         <Background variant="dots" gap={12} size={1} />
//       </ReactFlow>
//     </div>
//   );
// }