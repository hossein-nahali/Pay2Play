import type StateHome from "../interface/StateHome.ts";
import React from "react";

export default class HomeController {
    protected state: StateHome
    protected setState: React.Dispatch<React.SetStateAction<StateHome>>

    constructor(state: StateHome, setState: React.Dispatch<React.SetStateAction<StateHome>>) {
        this.state = state;
        this.setState = setState;
    }

    onChange(key: string, value: string | number): void {
        this.setState(prevState => {
            const newState = {
                ...prevState,
                [key]: value
            };

            // Update the internal state reference for calculation
            this.state = newState;

            // Call calculate after state is updated
            setTimeout(() => this.calculate(), 0);

            return newState;
        });
    }

    calculate() {
        const {
            starTimeH, starTimeM,
            endTimeH, endTimeM,
            starTimeType, endTimeType,
            price, numberPeople
        } = this.state;

        // Check if we have minimum required data
        if (!starTimeH || !endTimeH || !price) return;

        const cleanInt = (val: string | number | undefined | null): number => {
            if (typeof val === 'number') return val;
            if (val === '' || val === null || val === undefined) return 0;
            const parsed = parseInt(val || '0');
            return isNaN(parsed) ? 0 : parsed;
        };

        const startH = cleanInt(starTimeH);
        const startM = cleanInt(starTimeM);
        const endH = cleanInt(endTimeH);
        const endM = cleanInt(endTimeM);

        // Validate time inputs
        if (startH < 0 || startH > 12 || endH < 0 || endH > 12 ||
            startM < 0 || startM >= 60 || endM < 0 || endM >= 60) {
            return;
        }

        // Convert to 24-hour format
        let start24H = startH;
        let end24H = endH;

        if (starTimeType === 'pm' && startH !== 12) {
            start24H = startH + 12;
        } else if (starTimeType === 'am' && startH === 12) {
            start24H = 0;
        }

        if (endTimeType === 'pm' && endH !== 12) {
            end24H = endH + 12;
        } else if (endTimeType === 'am' && endH === 12) {
            end24H = 0;
        }

        const startTotalMin = (start24H * 60) + startM;
        const endTotalMin = (end24H * 60) + endM;

        let durationMin = endTotalMin - startTotalMin;

        // Handle overnight duration
        if (durationMin < 0) {
            durationMin += 24 * 60;
        }

        // If duration is 0, return
        if (durationMin === 0) return;

        const durationHours = durationMin / 60;
        let finalPrice = durationHours * cleanInt(price);
        let pricePerPeople = cleanInt(numberPeople) > 0 ? finalPrice / cleanInt(numberPeople) : finalPrice;

        finalPrice = Math.max(0, Math.round(finalPrice));
        pricePerPeople = Math.max(0, Math.round(pricePerPeople));

        this.setState(prev => ({
            ...prev,
            finalPrice,
            pricePerPeople,
        }));
    }

    onSubmit = (e?: any): void => {
        if (e) e.preventDefault();
        console.log('Form submitted:', this.state);
    }
}