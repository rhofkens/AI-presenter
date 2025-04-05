export const TAG_COLORS = {
  camera: 'bg-blue-100 text-blue-800',
  light: 'bg-yellow-100 text-yellow-800',
  streaming: 'bg-purple-100 text-purple-800',
  editing: 'bg-green-100 text-green-800',
  audio: 'bg-red-100 text-red-800',
  business: 'bg-gray-100 text-gray-800',
  education: 'bg-indigo-100 text-indigo-800',
  marketing: 'bg-pink-100 text-pink-800',
  technical: 'bg-cyan-100 text-cyan-800',
} as const;

export type TagType = keyof typeof TAG_COLORS;