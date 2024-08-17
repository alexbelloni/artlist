import React from "react";

type AppProps = {
    index: string,
    tag: string
};

const Badge: React.FC<AppProps> = ({ index, tag }) => {
    return (
        <div key={index}
            className="badge bg-dark text-white">
            <span>
                {tag}
            </span>
        </div>
    )
}
export default Badge;