type RowObj = {
	first_name: string;
	last_name: string;
	email: string;
	days_available: number;
	plan_type: string;
};

const tableDataComplex: RowObj[] = [
	{
		first_name: 'Juan',
		last_name: 'Pérez',
		email: 'juan.perez@email.com',
		days_available: 12,
		plan_type: 'Premium',
	},
	{
		first_name: 'María',
		last_name: 'García',
		email: 'maria.garcia@email.com',
		days_available: 5,
		plan_type: 'Básico',
	},
	{
		first_name: 'Carlos',
		last_name: 'López',
		email: 'carlos.lopez@email.com',
		days_available: 20,
		plan_type: 'Pro',
	},
	{
		first_name: 'Ana',
		last_name: 'Martínez',
		email: 'ana.martinez@email.com',
		days_available: 8,
		plan_type: 'Enterprise',
	},
];
export default tableDataComplex;
