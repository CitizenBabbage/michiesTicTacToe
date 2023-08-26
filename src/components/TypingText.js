import React, { useState, useEffect } from 'react';

export default function TypingText({ text }) {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText((prevText) => prevText + text[index]);
                setIndex((prevIndex) => prevIndex + 1);
            }, 100); // This sets the typing speed. Change 100 to whatever speed you want.

            return () => clearTimeout(timer); // Clear the timer on cleanup
        }
    }, [index, text]);

    return (
    <div class="block-container">
        <span className="retro-text">{displayedText}</span>
    </div>
        
    )
}

