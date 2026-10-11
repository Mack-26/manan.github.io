import Flow from '@/components/projects/blocks/Flow';

// SeeGround's four stages, redrawn. Only the VLM backbone changes in this project.
const STEPS = [
  { title: 'Parse the query', body: 'An LLM pulls out the target object and the anchor it’s described relative to.' },
  { title: 'Pick a viewpoint', body: 'A virtual camera is placed to look at the anchor, the way a person would.' },
  { title: 'Render with IDs', body: 'The 3D point cloud becomes a 2D image, with every object stamped with a number.' },
  { title: 'VLM picks a number', body: 'Image + a table of object positions go to the VLM, which answers with an ID.', accent: true, tag: '72B → 4B / 2B' },
];

export default function PipelineDiagram() {
  return <Flow steps={STEPS} label="SeeGround pipeline" />;
}
