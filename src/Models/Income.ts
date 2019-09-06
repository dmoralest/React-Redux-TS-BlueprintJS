import UUID from 'uuid/v4';

export default class Income {
	public readonly id: string;
	public name?: string;
	public amount?: number;
	public dayOfDeposit?: number;

	constructor(name?: string, amount?: number, dayOfDeposit?: number) {
		this.id = UUID();
		this.name = name;
		this.amount = amount;
		this.dayOfDeposit = dayOfDeposit || 1;
	}
}
