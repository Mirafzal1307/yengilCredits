export interface CardsState {
  cards: any;
  loading: boolean;
  error: null | string;
}

export enum CardActionTypes {
  FETCH_CARDS = "FETCH_CARDS",
  FETCH_CARDS_SUCCESS = "FETCH_CARDS_SUCCESS",
  FETCH_CARDS_ERROR = "FETCH_CARDS_ERROR",
}

interface FetchCardsAction {
  type: CardActionTypes.FETCH_CARDS;
}

interface FetchCardsSuccessAction {
  type: CardActionTypes.FETCH_CARDS_SUCCESS;
  payload: any[];
}

interface FetchCardsErrorAction {
  type: CardActionTypes.FETCH_CARDS_ERROR;
  payload: string;
}

export type CardAction =
  | FetchCardsAction
  | FetchCardsSuccessAction
  | FetchCardsErrorAction;
