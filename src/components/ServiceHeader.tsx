
type TValue = {
    title:string,
    text: string
}

const ServiceHeader = ({title, text}:TValue) => {
    return (
        <div className="bg-gradient-to-r from-primary-dark to-primary text-white rounded-lg shadow-md p-6 mb-8">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-white">{text}</p>
        </div>
    );
};

export default ServiceHeader;