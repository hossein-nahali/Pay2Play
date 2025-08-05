import './assets/css/home.scss'
import {useState} from "react";
import type StateHome from "./interface/StateHome.ts";
import HomeController from "./controller/HomeController.ts";
import {get} from 'lodash'

export default function Home() {
    const [state, setState] = useState<StateHome>({
        price: 0,
        starTimeType: 'am',
        endTimeType: 'am',
        starTimeH: '',
        starTimeM: '',
        endTimeH: '',
        endTimeM: '',
        numberPeople: 1,
        finalPrice: 0,
        pricePerPeople: 0,
    })
    const controller = new HomeController(state, setState);

    return (
        <section className="home-section">
            <form onSubmit={controller.onSubmit}>
                <div>
                    <div>
                        <label htmlFor="price">قیمت تومان</label>
                        <input
                            type="text"
                            placeholder="قیمت برای هر ساعت (تومان)"
                            id="price"
                            inputMode="numeric"
                            value={Number(state.price).toLocaleString('fa-IR')}
                            onChange={(e) => {
                                const raw = e.target.value.replace(/[^۰-۹0-9]/g, '');
                                const enDigits = raw.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
                                controller.onChange("price", parseInt(enDigits || '0'));
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="start-time">ساعت شروع</label>
                        <div className={'time-picker-wrapper'}>
                            <input type="number" className={'center'} placeholder={"دقیقه"} id={'start-time'}
                                   value={state.starTimeM}
                                   onChange={e => controller.onChange("starTimeM", get(e, "target.value"))}/>
                            <input type="number" className={'center'} placeholder={"ساعت"}
                                   value={state.starTimeH}
                                   onChange={e => controller.onChange("starTimeH", get(e, "target.value"))}/>
                            <select value={state.starTimeType} onChange={e => controller.onChange("starTimeType", get(e, "target.value"))}>
                                <option value="am">قبل از ظهر</option>
                                <option value="pm">بعد از ظهر</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="end-time">ساعت پایان</label>
                        <div className={'time-picker-wrapper'}>
                            <input type="number" className={'center'} placeholder={"دقیقه"} id={'end-time'}
                                   value={state.endTimeM}
                                   onChange={e => controller.onChange("endTimeM", get(e, "target.value"))}/>
                            <input type="number" className={'center'} placeholder={"ساعت"}
                                   value={state.endTimeH}
                                   onChange={e => controller.onChange("endTimeH", get(e, "target.value"))}/>
                            <select value={state.endTimeType} onChange={e => controller.onChange("endTimeType", get(e, "target.value"))}>
                                <option value="am">قبل از ظهر</option>
                                <option value="pm">بعد از ظهر</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="numberPeople">تعداد نفرات</label>
                        <input type="number" placeholder={"تعداد نفرات"} id="numberPeople"
                               value={state.numberPeople}
                               onChange={e => controller.onChange("numberPeople", get(e, "target.value"))}/>
                    </div>
                </div>
                <div>
                    {state.finalPrice ?
                        <p>قیمت کل: <span>{state.finalPrice.toLocaleString('fa-IR')}</span></p> : undefined}
                    {state.pricePerPeople && state.pricePerPeople !== state.finalPrice ?
                        <p>سهم هر نفر: <span>{state.pricePerPeople.toLocaleString('fa-IR')}</span></p> : undefined}
                    <button>محاسبه قیمت</button>
                </div>
            </form>
        </section>
    );
}