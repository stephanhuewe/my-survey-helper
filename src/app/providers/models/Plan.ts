/**
 * Created by malaka on 11/4/17.
 */

export interface Plan {
  planNo: number,
  dateOfPlan: any,
  dateOfSurvey: Date,
  extent: {
    A: number,
    R: number,
    P: number,
    Ha: number,
  },
  location: {
    landName: string,
    village: string,
    district: string
  }
  customer?: string,
}
