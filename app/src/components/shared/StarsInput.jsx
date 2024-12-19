import React, { useEffect, useRef, useState } from 'react'

const generateRangeArray = (end) => {
    return Array.from(new Array(end)).map((_, i) => i + 1)
}

const StarsInput = ({ stars = 5, name = "review", className = "", label = "", onChange = () => {} }) => {
    const randomKeyValue = new Date().getTime();
    const reviewStars = generateRangeArray(stars);

    const hiddenValue = useRef();

    const value = useRef({ name, value: 0 });
    const setValue = (val) => {
        value.current.value = val;
        hiddenValue.current.value = val;
    } 

    const handleReview = (value) => {
        setValue(value);
        onChange({ target: { name, value } });

        const a = generateRangeArray(stars);
    
        a.forEach(i => {
            const el = document.querySelector(`[data-id="star-${i}-${randomKeyValue}"]`);
            el.classList.add("text-text_secondaryColor");
            el.classList.remove("text-yellow-300");
        });

        handleMouseOver(value)
    }

    const handleMouseOver = (index) => {
        const a = generateRangeArray(index);

        a.forEach(i => {
            const el = document.querySelector(`[data-id="star-${i}-${randomKeyValue}"]`);
            el.classList.add("text-yellow-300");
            el.classList.remove("text-text_secondaryColor");
        });
    }
    
    const handleMouseLeave = () => {
        const a = generateRangeArray(stars);
    
        a.forEach(i => {
            if (i > value.current.value) {
                const el = document.querySelector(`[data-id="star-${i}-${randomKeyValue}"]`);
                el.classList.add("text-text_secondaryColor");
                el.classList.remove("text-yellow-300");
            }
        });
    }

    return (
        <div className={className}>
            {
                label != "" && <div>{label}</div>
            }
            {
                reviewStars.map((value) => (
                    <button key={`star-${value}-${randomKeyValue}`} type="button" className="cursor-default" onClick={() => handleReview(value)}>
                        <i data-id={`star-${value}-${randomKeyValue}`} onMouseEnter={() => handleMouseOver(value)} onMouseLeave={handleMouseLeave} className={"fa-solid fa-star text-text_secondaryColor"}></i>
                    </button>
                ))
            }
            <input type="hidden" ref={hiddenValue} name={name} value={value.current.value} />
        </div>
    )
}

export default StarsInput