/**
 * Created by malaka on 11/5/17.
 */

export interface CoatOrder {
  orderNumber: number,
  orderNumberPrefix: string;
  receivedDate: Date;
  noticeDate: Date;
  surveyDate: Date;
  forwardDate: Date;
  surveyType: number; // first = 1, final = 2
  coat: string;
}

// Coats
// Kaluthara - kal
// Horana - hor
// Panadura - pan
// Moratuwa - mora
// Mount Lavinia - motl
