type RowObj = {
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	days_available: number;
	plan_type: string;
};

const tableDataComplex: RowObj[] = [
	{
		first_name: 'Juan',
		last_name: 'Pérez',
		email: 'juan.perez@email.com',
		phone: '+34 612 345 678',
		days_available: 12,
		plan_type: 'Premium',
	},
	{
		first_name: 'Maria',
		last_name: 'García',
		email: 'maria.garcia@email.com',
		phone: '+34 623 456 789',
		days_available: 5,
		plan_type: 'Básico',
	},
	{
		first_name: 'Carlos',
		last_name: 'López',
		email: 'carlos.lopez@email.com',
		phone: '+34 634 567 890',
		days_available: 20,
		plan_type: 'Pro',
	},
	{
		first_name: 'Ana',
		last_name: 'Martínez',
		email: 'ana.martinez@email.com',
		phone: '+34 645 678 901',
		days_available: 8,
		plan_type: 'Enterprise',
	},
];
export default tableDataComplex;
