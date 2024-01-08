interface IRegistration {
    id: string | null;
    name: string;
    surname: string;
    address: string;
    city: string;
    country: string;
    number: string;
    email: string;
    password: string
};

export default IRegistration;