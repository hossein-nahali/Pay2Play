export default interface StateHome {
    price: number;
    starTimeType: 'am' | 'pm';
    endTimeType: 'am' | 'pm';
    starTimeH: string;
    starTimeM: string;
    endTimeH: string;
    endTimeM: string;
    numberPeople: number;
    finalPrice: number;
    pricePerPeople: number;
}