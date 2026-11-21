'use client';
import React, { useRef, useState, useEffect } from 'react';
import {
    FaBold,
    FaItalic,
    FaUnderline,
    FaStrikethrough,
    FaHeading,
    FaQuoteLeft,
    FaListUl,
    FaListOl,
    FaLink,
    FaUnlink,
    FaImage,
    FaCode,
    FaUndo,
    FaTimes
} from 'react-icons/fa';

const WordPressEditor = ({ value, onChange, placeholder }) => {
    const editorRef = useRef(null);
    const savedRangeRef = useRef(null);

    // modal dialog states
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [linkText, setLinkText] = useState('');
    const [linkUrl, setLinkUrl] = useState('');

    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageCaption, setImageCaption] = useState('');

    // keep editor dom content in sync with external value
    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || '';
        }
    }, [value]);

    // save current text selection range
    const saveSelection = () => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            savedRangeRef.current = sel.getRangeAt(0).cloneRange();
        }
    };

    // restore previously saved text selection range
    const restoreSelection = () => {
        const sel = window.getSelection();
        if (savedRangeRef.current && sel) {
            sel.removeAllRanges();
            sel.addRange(savedRangeRef.current);
        }
    };

    // notify parent on changes
    const emitChange = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    // execute standard editor command
    const executeCommand = (command, arg = null) => {
        document.execCommand(command, false, arg);
        emitChange();
    };

    // trigger link modal
    const handleOpenLinkModal = () => {
        saveSelection();
        const sel = window.getSelection();
        const selectedString = sel ? sel.toString().trim() : '';
        setLinkText(selectedString);
        setLinkUrl('');
        setIsLinkModalOpen(true);
    };

    // apply link on selected word
    const handleApplyLink = (e) => {
        e.preventDefault();
        if (!linkUrl.trim()) return;

        const formattedUrl = linkUrl.trim().startsWith('http://') || linkUrl.trim().startsWith('https://')
            ? linkUrl.trim()
            : `https://${linkUrl.trim()}`;

        restoreSelection();

        if (linkText.trim()) {
            const linkHtml = `<a href="${formattedUrl}" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:text-cyan-300 underline font-semibold">${linkText.trim()}</a>`;
            document.execCommand('insertHTML', false, linkHtml);
        } else {
            document.execCommand('createLink', false, formattedUrl);
        }

        emitChange();
        setIsLinkModalOpen(false);
        setLinkText('');
        setLinkUrl('');
    };

    // trigger image modal
    const handleOpenImageModal = () => {
        saveSelection();
        setImageUrl('');
        setImageCaption('');
        setIsImageModalOpen(true);
    };

    // apply inline image between paragraphs
    const handleApplyImage = (e) => {
        e.preventDefault();
        if (!imageUrl.trim()) return;

        const formattedImg = imageUrl.trim().startsWith('http://') || imageUrl.trim().startsWith('https://')
            ? imageUrl.trim()
            : `https://${imageUrl.trim()}`;

        const caption = imageCaption.trim() || 'Article illustration';

        restoreSelection();

        const imageFigureHtml = `
            <figure class="my-6 overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-900/80 shadow-xl">
                <img src="${formattedImg}" alt="${caption}" class="w-full max-h-[420px] object-cover" />
                <figcaption class="text-center text-xs text-slate-400 py-2 px-4 bg-slate-950/80 italic border-t border-white/5">📷 ${caption}</figcaption>
            </figure>
            <p><br></p>
        `;

        document.execCommand('insertHTML', false, imageFigureHtml);
        emitChange();
        setIsImageModalOpen(false);
        setImageUrl('');
        setImageCaption('');
    };

    return (
        <div className="w-full rounded-2xl border border-slate-700/80 bg-slate-900/90 overflow-hidden focus-within:border-cyan-400 transition-colors">
            {/* wordpress style visual toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 bg-[#0d1629] border-b border-slate-800 text-slate-300 select-none">
                {/* headings selector */}
                <select
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'p') {
                            executeCommand('formatBlock', '<p>');
                        } else {
                            executeCommand('formatBlock', `<${val}>`);
                        }
                    }}
                    className="bg-slate-800 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-400 cursor-pointer mr-1"
                >
                    <option value="p">Paragraph</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                    <option value="h4">Heading 4</option>
                </select>

                <div className="h-5 w-[1px] bg-slate-700/60 mx-1" />

                {/* inline formatting tools */}
                <button
                    type="button"
                    onClick={() => executeCommand('bold')}
                    className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                    title="Bold"
                >
                    <FaBold className="text-xs" />
                </button>
                <button
                    type="button"
                    onClick={() => executeCommand('italic')}
                    className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                    title="Italic"
                >
                    <FaItalic className="text-xs" />
                </button>
                <button
                    type="button"
                    onClick={() => executeCommand('underline')}
                    className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                    title="Underline"
                >
                    <FaUnderline className="text-xs" />
                </button>
                <button
                    type="button"
                    onClick={() => executeCommand('strikeThrough')}
                    className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                    title="Strikethrough"
                >
                    <FaStrikethrough className="text-xs" />
                </button>

                <div className="h-5 w-[1px] bg-slate-700/60 mx-1" />

                {/* quote and lists */}
                <button
                    type="button"
                    onClick={() => executeCommand('formatBlock', '<blockquote>')}
                    className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                    title="Quote"
                >
                    <FaQuoteLeft className="text-xs" />
                </button>
                <button
                    type="button"
                    onClick={() => executeCommand('insertUnorderedList')}
                    className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                    title="Bullet List"
                >
                    <FaListUl className="text-xs" />
                </button>
                <button
                    type="button"
                    onClick={() => executeCommand('insertOrderedList')}
                    className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                    title="Numbered List"
                >
                    <FaListOl className="text-xs" />
                </button>
                <button
                    type="button"
                    onClick={() => executeCommand('formatBlock', '<pre>')}
                    className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                    title="Code Block"
                >
                    <FaCode className="text-xs" />
                </button>

                <div className="h-5 w-[1px] bg-slate-700/60 mx-1" />

                {/* visual link tool */}
                <button
                    type="button"
                    onClick={handleOpenLinkModal}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition-colors cursor-pointer"
                    title="Select text and click to link to any website"
                >
                    <FaLink className="text-[10px]" /> Link Word
                </button>
                <button
                    type="button"
                    onClick={() => executeCommand('unlink')}
                    className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                    title="Remove Link"
                >
                    <FaUnlink className="text-xs" />
                </button>

                <div className="h-5 w-[1px] bg-slate-700/60 mx-1" />

                {/* visual image insertion tool */}
                <button
                    type="button"
                    onClick={handleOpenImageModal}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-950/80 hover:bg-blue-900 border border-blue-500/40 text-blue-300 text-xs font-semibold transition-colors cursor-pointer"
                    title="Insert an inline photo with caption between paragraphs"
                >
                    <FaImage className="text-[10px]" /> Insert Photo
                </button>

                {/* undo action */}
                <button
                    type="button"
                    onClick={() => executeCommand('undo')}
                    className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer ml-auto"
                    title="Undo"
                >
                    <FaUndo className="text-xs" />
                </button>
            </div>

            {/* content editable writing surface */}
            <div
                ref={editorRef}
                contentEditable
                onInput={emitChange}
                onBlur={emitChange}
                onKeyUp={saveSelection}
                onMouseUp={saveSelection}
                className="w-full min-h-[220px] max-h-[460px] overflow-y-auto p-4 text-slate-100 text-sm leading-relaxed focus:outline-none focus:ring-0 [&_a]:text-cyan-400 [&_a]:underline [&_a]:font-semibold [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-cyan-300 [&_h2]:my-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-cyan-200 [&_h3]:my-2 [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-cyan-100 [&_h4]:my-2 [&_blockquote]:p-3 [&_blockquote]:my-3 [&_blockquote]:rounded-xl [&_blockquote]:bg-cyan-950/20 [&_blockquote]:border-l-4 [&_blockquote]:border-cyan-400 [&_blockquote]:text-cyan-200 [&_blockquote]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_pre]:bg-slate-950 [&_pre]:p-3 [&_pre]:rounded-xl [&_pre]:font-mono [&_pre]:text-xs [&_pre]:text-cyan-300 [&_pre]:my-2"
                data-placeholder={placeholder || 'Write your article here...'}
            />

            {/* link modal dialog */}
            {isLinkModalOpen && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
                    <div className="bg-[#0e172e] border border-cyan-400/60 rounded-2xl w-full max-w-md p-6 shadow-2xl relative text-left">
                        <button
                            onClick={() => setIsLinkModalOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                            <FaTimes className="text-sm" />
                        </button>

                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                                <FaLink className="text-xs" />
                            </div>
                            <div>
                                <h4 className="text-base font-bold text-white">Create Hyperlink</h4>
                                <p className="text-[11px] text-slate-400">Connect selected keyword to any website URL</p>
                            </div>
                        </div>

                        <form onSubmit={handleApplyLink} className="space-y-3.5 text-xs">
                            <div>
                                <label className="block text-slate-300 font-semibold mb-1">
                                    Keyword / Anchor Text
                                </label>
                                <input
                                    type="text"
                                    value={linkText}
                                    onChange={(e) => setLinkText(e.target.value)}
                                    placeholder="Selected word or phrase"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-slate-300 font-semibold mb-1">
                                    Destination Web Address (URL) <span className="text-cyan-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    placeholder="https://example.com"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
                                    required
                                    autoFocus
                                />
                            </div>

                            <div className="pt-2 flex items-center justify-end gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setIsLinkModalOpen(false)}
                                    className="px-4 py-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-800 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold transition-all cursor-pointer shadow-md"
                                >
                                    Apply Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* image modal dialog */}
            {isImageModalOpen && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
                    <div className="bg-[#0e172e] border border-blue-400/60 rounded-2xl w-full max-w-md p-6 shadow-2xl relative text-left">
                        <button
                            onClick={() => setIsImageModalOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                            <FaTimes className="text-sm" />
                        </button>

                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                                <FaImage className="text-xs" />
                            </div>
                            <div>
                                <h4 className="text-base font-bold text-white">Insert Photo with Caption</h4>
                                <p className="text-[11px] text-slate-400">Place an inline image directly between paragraphs</p>
                            </div>
                        </div>

                        <form onSubmit={handleApplyImage} className="space-y-3.5 text-xs">
                            <div>
                                <label className="block text-slate-300 font-semibold mb-1">
                                    Image URL <span className="text-cyan-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
                                    required
                                    autoFocus
                                />
                            </div>

                            <div>
                                <label className="block text-slate-300 font-semibold mb-1">
                                    Image Caption
                                </label>
                                <input
                                    type="text"
                                    value={imageCaption}
                                    onChange={(e) => setImageCaption(e.target.value)}
                                    placeholder="e.g. Next.js SSR Architecture Diagram"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
                                />
                            </div>

                            <div className="pt-2 flex items-center justify-end gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setIsImageModalOpen(false)}
                                    className="px-4 py-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-800 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-1.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-semibold transition-all cursor-pointer shadow-md"
                                >
                                    Insert Image
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WordPressEditor;
