import { dataServices } from "@/components/data/dataExtraServices";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  service: [
    {
      title: "Авторський супровід",
      text: `Наша компанія пропонує послугу "авторський супровід ". Ця послуга передбачає, що ми будемо відвідувати об'єкт 1-2 рази на тиждень та контролювати всі етапи будівництва від самого початку до здачі проєкту. Ми забезпечимо виконання всіх етапів проєкту згідно зі специфікаціями і технічними вимогами. Ми забезпечимо взаємодію з підрядними організаціями, ка надаватимемо звіти з проміжних результатів. Отже, якщо ви хочете, щоб ваш будівельний проєкт був реалізований згідно з планом, без зайвих затримок та проблем, зверніться до нашої компанії і ми з радістю забезпечимо вам авторський супровід дизайн проєкту.`,
      price: "300грн",
      img: '',
    },
    {
      title: "Вибір матеріалів",
      text: `Наша компанія пропонує послугу "авторський супровід ". Ця послуга передбачає, що ми будемо відвідувати об'єкт 1-2 рази на тиждень та контролювати всі етапи будівництва від самого початку до здачі проєкту. Ми забезпечимо виконання всіх етапів проєкту згідно зі специфікаціями і технічними вимогами. Ми забезпечимо взаємодію з підрядними організаціями, ка надаватимемо звіти з проміжних результатів. Отже, якщо ви хочете, щоб ваш будівельний проєкт був реалізований згідно з планом, без зайвих затримок та проблем, зверніться до нашої компанії і ми з радістю забезпечимо вам авторський супровід дизайн проєкту.`,
      price: "300грн",
      img: '',
    },
    {
      title: "Професійний ремонт",
      text: `Наша компанія пропонує послугу "авторський супровід ". Ця послуга передбачає, що ми будемо відвідувати об'єкт 1-2 рази на тиждень та контролювати всі етапи будівництва від самого початку до здачі проєкту. Ми забезпечимо виконання всіх етапів проєкту згідно зі специфікаціями і технічними вимогами. Ми забезпечимо взаємодію з підрядними організаціями, ка надаватимемо звіти з проміжних результатів. Отже, якщо ви хочете, щоб ваш будівельний проєкт був реалізований згідно з планом, без зайвих затримок та проблем, зверніться до нашої компанії і ми з радістю забезпечимо вам авторський супровід дизайн проєкту.`,
      price: "300грн",
      img: '',
    },
    {
      title: "Вибір матеріалів",
      text: `Наша компанія пропонує послугу "авторський супровід ". Ця послуга передбачає, що ми будемо відвідувати об'єкт 1-2 рази на тиждень та контролювати всі етапи будівництва від самого початку до здачі проєкту. Ми забезпечимо виконання всіх етапів проєкту згідно зі специфікаціями і технічними вимогами. Ми забезпечимо взаємодію з підрядними організаціями, ка надаватимемо звіти з проміжних результатів. Отже, якщо ви хочете, щоб ваш будівельний проєкт був реалізований згідно з планом, без зайвих затримок та проблем, зверніться до нашої компанії і ми з радістю забезпечимо вам авторський супровід дизайн проєкту.`,
      price: "300грн",
      img: '',
    },
    {
      title: "Професійний ремонт",
      text: `Наша компанія пропонує послугу "авторський супровід ". Ця послуга передбачає, що ми будемо відвідувати об'єкт 1-2 рази на тиждень та контролювати всі етапи будівництва від самого початку до здачі проєкту. Ми забезпечимо виконання всіх етапів проєкту згідно зі специфікаціями і технічними вимогами. Ми забезпечимо взаємодію з підрядними організаціями, ка надаватимемо звіти з проміжних результатів. Отже, якщо ви хочете, щоб ваш будівельний проєкт був реалізований згідно з планом, без зайвих затримок та проблем, зверніться до нашої компанії і ми з радістю забезпечимо вам авторський супровід дизайн проєкту.`,
      price: "300грн",
      img: '',
    },
  ],
  openBlockIndex: null,
}

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
   reducers: {
    openBlock: (state, action) => {
      state.openBlockIndex = action.payload;
    },
    setTitle: (state, action) => {
      state.service[state.openBlockIndex].title = action.payload;
    },
    setText: (state, action) => {
      state.service[state.openBlockIndex].text = action.payload;
    },
    setPrice: (state, action) => {
      state.service[state.openBlockIndex].price = action.payload;
    },
    setImage: (state, action) => {
      state.service[state.openBlockIndex].img = action.payload;
    }
   }
})

export const {openBlock, setTitle, setText, setPrice, setImage} = serviceSlice.actions;
export default serviceSlice.reducer;