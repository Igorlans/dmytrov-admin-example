import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tariffes: [
    {
    id: 0,
    title: "Базовий",
    subtitle: "Технічний проєкт",
    price: "300",
    text: "Для тих, хто має розуміння в ремонті або ж маєте перевірену будівельну бригаду. Підійде для технічно нескладних об'єктів. Містить базовий набір креслення і схем для вашого ремонту.",
    textMob: `Тариф "Базовий" стане в пригоді якщо ви самостійно розумієтеся в ремонті або ж маєте перевірену будівельну бригаду. `,
    link: "../services/basic"
  },
  {
    id: 1,
    title: "Стандарт",
    subtitle: "Технічний проєкт",
    price: "500",
    text: "Якщо ви не маєте бажання розбиратись в будівельних тонкощах, але хочете самостійно вибирати колір шпалер чи модель ліжка — тоді цей тариф це ваш варіант. Підійде для будь-яких об'єктів оскільки має в собі всі необхідні креслення та схеми для правильного ремонту.",
    textMob: `Тариф "Стандарт" - якщо ви не маєте бажання розбиратись в будівельних тонкощах. `,
    link: "../services/standart"
  },
  {
    id: 2,
    title: "Преміум",
    subtitle: "Технічний + Дизайн проєкт",
    price: "1 000",
    text: "Не маєте бажання і часу ходити по будівельних магазинах та вибирати оздоблювальні матеріали? Залиште це нам. Окрім всіх необхідних технічних креслень ми надамо реалістичну 3D-візуалізацію зі специфікацією всіх матеріалів та предметів інтер'єру.",
    textMob: `Тариф "Преміум" - якщо Ви не маєте бажання і часу займатись ремонтом та ходити по будівельних магазинах. `,
    link: "../services/premium"
  },
  ],
  openBlockIndex: null,
}

export const tariffSlice = createSlice({
  name: 'tariff',
  initialState,
  reducers: {
      openBlock: (state, action) => {
        state.openBlockIndex = action.payload;
      },
      setSum: (state, action) => {
        state.tariffes[state.openBlockIndex].price = action.payload;
      },
      setTitler: (state, action) => {
        state.tariffes[state.openBlockIndex].title = action.payload;
      },
      setTexter: (state, action) => {
        state.tariffes[state.openBlockIndex].text = action.payload;
      },
      setunTitler: (state, action) => {
        state.tariffes[state.openBlockIndex].subtitle = action.payload;
      }
  }
})

export const {openBlock, setSum, setTitler, setTexter, setunTitler} = tariffSlice.actions;
export default tariffSlice.reducer;