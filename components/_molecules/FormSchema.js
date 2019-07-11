import * as yup from 'yup';

const formSchema = () => (
    yup.object().shape({
        from: yup.object().typeError('Please Select Starting Airport').shape({ ...airportSchema }),
        to: yup.object().typeError('Please Select Ending Airport').shape({ ...airportSchema }),
    })
);

const airportSchema = {
    code: yup.string().required('Code is Required'),
    lat: yup.string().required('Lattitude is Required'),
    lon: yup.string().required('Longtitude is Required'),
    name: yup.string().required('Name is Required'),
    city: yup.string().required('City is Required'),
}

export default formSchema;