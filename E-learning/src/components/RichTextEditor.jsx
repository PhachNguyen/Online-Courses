import React, { useState, useRef } from 'react';

const RichTextEditor = ({ value, onChange, placeholder, rows = 4 }) => {
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const textareaRef = useRef(null);

    const toolbarButtons = [
        {
            label: "Bold",
            icon: "B",
            action: () => {
                setIsBold(!isBold);
                document.execCommand('bold', false, null);
            },
            active: isBold
        },
        {
            label: "Italic",
            icon: "I",
            action: () => {
                setIsItalic(!isItalic);
                document.execCommand('italic', false, null);
            },
            active: isItalic
        },
        {
            label: "Underline",
            icon: "U",
            action: () => {
                setIsUnderline(!isUnderline);
                document.execCommand('underline', false, null);
            },
            active: isUnderline
        },
        {
            label: "Color",
            icon: "A",
            action: () => {
                const color = prompt('Enter color (e.g., red, #ff0000):');
                if (color) {
                    document.execCommand('foreColor', false, color);
                }
            },
            active: false
        },
        {
            label: "Strikethrough",
            icon: "S",
            action: () => document.execCommand('strikeThrough', false, null),
            active: false
        },
        {
            label: "Subscript",
            icon: "X₂",
            action: () => document.execCommand('subscript', false, null),
            active: false
        },
        {
            label: "Superscript",
            icon: "X²",
            action: () => document.execCommand('superscript', false, null),
            active: false
        },
        {
            label: "Quote",
            icon: "❝",
            action: () => {
                const selection = window.getSelection();
                if (selection.toString()) {
                    const quote = `"${selection.toString()}"`;
                    document.execCommand('insertText', false, quote);
                }
            },
            active: false
        },
        {
            label: "Code",
            icon: "&lt;/&gt;",
            action: () => {
                const selection = window.getSelection();
                if (selection.toString()) {
                    const code = `\`${selection.toString()}\``;
                    document.execCommand('insertText', false, code);
                }
            },
            active: false
        },
        {
            label: "Bullet List",
            icon: "•",
            action: () => document.execCommand('insertUnorderedList', false, null),
            active: false
        },
        {
            label: "Numbered List",
            icon: "1.",
            action: () => document.execCommand('insertOrderedList', false, null),
            active: false
        },
        {
            label: "Indent",
            icon: "→",
            action: () => document.execCommand('indent', false, null),
            active: false
        },
        {
            label: "Outdent",
            icon: "←",
            action: () => document.execCommand('outdent', false, null),
            active: false
        },
        {
            label: "Link",
            icon: "🔗",
            action: () => {
                const url = prompt('Enter URL:');
                if (url) {
                    document.execCommand('createLink', false, url);
                }
            },
            active: false
        },
        {
            label: "Image",
            icon: "🖼️",
            action: () => {
                const url = prompt('Enter image URL:');
                if (url) {
                    document.execCommand('insertImage', false, url);
                }
            },
            active: false
        },
        {
            label: "Table",
            icon: "⊞",
            action: () => {
                const rows = prompt('Enter number of rows:', '3');
                const cols = prompt('Enter number of columns:', '3');
                if (rows && cols) {
                    let table = '<table border="1">';
                    for (let i = 0; i < parseInt(rows); i++) {
                        table += '<tr>';
                        for (let j = 0; j < parseInt(cols); j++) {
                            table += '<td>Cell</td>';
                        }
                        table += '</tr>';
                    }
                    table += '</table>';
                    document.execCommand('insertHTML', false, table);
                }
            },
            active: false
        },
        {
            label: "Formula",
            icon: "fx",
            action: () => {
                const formula = prompt('Enter formula (e.g., x² + y² = z²):');
                if (formula) {
                    document.execCommand('insertText', false, formula);
                }
            },
            active: false
        }
    ];

    const handleTextChange = (e) => {
        onChange(e.target.value);
    };

    const handleKeyDown = (e) => {
        // Handle keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'b':
                    e.preventDefault();
                    toolbarButtons[0].action();
                    break;
                case 'i':
                    e.preventDefault();
                    toolbarButtons[1].action();
                    break;
                case 'u':
                    e.preventDefault();
                    toolbarButtons[2].action();
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div className="border border-gray-300 rounded">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-200">
                {toolbarButtons.map((button, index) => (
                    <button
                        key={index}
                        className={`px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-200 transition ${button.active ? 'bg-blue-100 border-blue-300' : ''
                            }`}
                        title={button.label}
                        onClick={button.action}
                        type="button"
                    >
                        <span dangerouslySetInnerHTML={{ __html: button.icon }} />
                    </button>
                ))}
            </div>

            {/* Textarea */}
            <textarea
                ref={textareaRef}
                value={value}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full p-3 border-0 rounded-b resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={rows}
            />
        </div>
    );
};

export default RichTextEditor; 