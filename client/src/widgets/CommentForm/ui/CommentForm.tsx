// import React, { useState } from 'react';
// import { Textarea, Button, Select, ColorInput, Group } from '@mantine/core';

// const fontSizes = [
//   { value: '14px', label: 'Маленький (14px)' },
//   { value: '18px', label: 'Средний (18px)' },
//   { value: '24px', label: 'Большой (24px)' },
// ];

// const fonts = [
//   { value: 'Arial', label: 'Arial' },
//   { value: 'Times New Roman', label: 'Times New Roman' },
//   { value: 'Courier New', label: 'Courier New' },
// ];

// interface CommentFormProps {
//   routeId: number;
//   onAddComment: (
//     text: string,
//     style: { color: string; font: string; fontSize: string },
//   ) => void;
// }

// export const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
//   const [text, setText] = useState('');
//   const [color, setColor] = useState('#000000');
//   const [font, setFont] = useState<string | null>(fonts[0].value); // Обновляем тип
//   const [fontSize, setFontSize] = useState<string | null>(fontSizes[1].value); // Обновляем тип

//   const handleSubmit = () => {
//     if (!text.trim()) return;

//     if (font && fontSize) {
//       onAddComment(text, { color, font, fontSize }); // Вызываем функцию из родителя
//       setText('');
//     }
//   };

//   return (
//     <div>
//       <Textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Напишите комментарий..."
//         autosize
//         minRows={3}
//         style={{ fontFamily: font || 'Arial', fontSize: fontSize || '18px', color }}
//       />
//       <Group mt="md">
//         <Select
//           data={fonts}
//           value={font}
//           onChange={(value) => setFont(value)} // Тип корректно передает string | null
//           label="Шрифт"
//         />
//         <Select
//           data={fontSizes}
//           value={fontSize}
//           onChange={(value) => setFontSize(value)} // Тип корректно передает string | null
//           label="Размер"
//         />
//         <ColorInput value={color} onChange={setColor} label="Цвет текста" />
//       </Group>
//       <Button mt="md" onClick={handleSubmit}>
//         Добавить комментарий
//       </Button>
//     </div>
//   );
// };
