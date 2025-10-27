

const HeaderBox = ({ 
    type = "title", 
    title, subtext, 
    user }: HeaderBoxProps
) => {
    return (
        <div className="header-box mx-4">
            <h1 className="header-box-title">
                { title }
                {type === "greeting" && (
                    <span className="text-blue-600">
                        &nbsp;{ user }
                    </span>
                )}
            </h1>

            <p className="header-box-subtext">{subtext}</p>
        </div>
    )
}

export default HeaderBox