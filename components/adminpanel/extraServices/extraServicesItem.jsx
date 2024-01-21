import { useState } from "react";
import ServicesDrawer from "./Drawer";

const ExtraServicesItem = ({ idx, item, storage, setStorage }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    };

    return (
        <div
            className={
                open
                    ? "questions__item questions__item-all questions__item-all--active"
                    : "questions__item questions__item-all"
            }
            onClick={() => handleOpen()}
        >
            <div
                className={
                    open
                        ? "questions__item-line questions__item-line--active"
                        : "questions__item-line"
                }
            >
                <div className="service__item-title questions__item-title-all">
                    {`${item?.order}. ${item?.title}`}
                </div>
            </div>
            <div className="questions__item-text-box">
                <div className="allservices__question-inner">
                    <div className="allservices__image">
                        <img
                            src={item?.image?.url}
                            alt=""
                            className="allservices__question-img"
                        />
                    </div>
                    <div className="allservices__question-box">
                        <div
                            className="services__item-descr questions__item-text-noml break-words"
                            dangerouslySetInnerHTML={{ __html: item.descr }}
                        ></div>
                        <div className="services__item-price">
                            <span className="services__item-price_text">
                                Вартість за м<sup>2</sup>:
                            </span>
                            {item.price} грн
                        </div>
                        <a
                            className="button allservices__question-btn"
                            href="#"
                        >
                            {/* Замовити послугу */}
                        </a>
                    </div>
                </div>
            </div>
            <div className="my-10 mx-10">
                <ServicesDrawer
                    storage={storage}
                    setStorage={setStorage}
                    item={item}
                />
            </div>
        </div>
    );
};

export default ExtraServicesItem;
