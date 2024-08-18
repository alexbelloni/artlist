import React from "react";

type AppProps = {
    tag: string
};

const Badge: React.FC<AppProps> = ({ tag }) => {
    return (
        <div 
            className="badge bg-dark text-white">
            <span>
                {tag}
            </span>
        </div>
    )
}
export default Badge;