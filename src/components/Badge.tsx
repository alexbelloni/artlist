import React from "react";

type AppProps = {
    key: number,
    tag: string
};

const Badge: React.FC<AppProps> = ({ key, tag }) => {
    return (
        <div key={key}
            className="badge bg-dark text-white">
            <span>
                {tag}
            </span>
        </div>
    )
}
export default Badge;