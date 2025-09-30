import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import api from "../services/api.ts";
import {Company} from "../context/AuthContext.tsx";

const CompanyPage = () => {
const [company, setCompany] = useState<Company | null>(null);
const params = useParams();
const fetchCompany = async () => {
    try {
        const response = await api.get<Company>(`/companies/${params.name}`);
        console.log(response.data);
        setCompany(response.data);

    } catch (error) {
        console.log(error);
    }

}
    useEffect(() => {
        fetchCompany()
    }, []);
if (!company) {
    return (
        <main>
            <h1>404</h1>
        </main>
    )
}

    return (<main>
        <h1>{company?.name}</h1>
        <h2>{company?.website}</h2>
    </main>)
};
export default CompanyPage;