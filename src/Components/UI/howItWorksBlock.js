import react from 'react';

export default function HowItWorksBlock({ title = "Title", description = "Description", logo = "X" }) {
    return (

        <div className="how-it-works">
            <div>{logo}</div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>

    )
}