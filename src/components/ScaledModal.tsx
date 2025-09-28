interface ImageLink {
    link:string;
}

const ScaledModal: React.FC<ImageLink> = ({link}) => {
    return(
        <div className="w-full h-full">
            <img src={link} className="w-full h-full object-scale-down rounded-xl"/>
        </div>
    )
}

export default ScaledModal;