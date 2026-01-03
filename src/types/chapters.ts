export interface Chapter {
  id: string
  title: string
  parentId?: string
  children?: Chapter[]
}

export const chapters: Chapter[] = [
  {
    id: 'boolean-algebra',
    title: '布林代數與第摩根定理',
    children: [
      { id: 'boolean-basic', title: '布林代數基本運算', parentId: 'boolean-algebra' },
      { id: 'demorgan', title: '第摩根定理', parentId: 'boolean-algebra' },
      { id: 'gate-conversion', title: '邏輯閘互換', parentId: 'boolean-algebra' },
      { id: 'boolean-simplify', title: '布林代數化簡', parentId: 'boolean-algebra' },
      { id: 'sop-pos', title: '布林代數表示（SOP, POS）', parentId: 'boolean-algebra' },
      { id: 'algebra-algorithm', title: '代數演算法', parentId: 'boolean-algebra' },
      { id: 'k-map', title: '卡諾圖（K-Map）互動化簡', parentId: 'boolean-algebra' },
      { id: 'combinational-simplify', title: '組合邏輯電路化簡', parentId: 'boolean-algebra' },
    ],
  },
  {
    id: 'number-system',
    title: '數字系統',
    children: [
      { id: 'number-representation', title: '十、二、八、十六進位表示法', parentId: 'number-system' },
      { id: 'number-conversion', title: '數字表示法之互換', parentId: 'number-system' },
      { id: 'complement', title: '補數（1\'s, 2\'s, 9\'s, 10\'s Complement）', parentId: 'number-system' },
      { id: 'bcd-encoding', title: '二進碼十進數 (BCD) 及字元編碼 (ASCII, Gray Code)', parentId: 'number-system' },
    ],
  },
]

export function findChapterById(id: string): Chapter | undefined {
  for (const chapter of chapters) {
    if (chapter.id === id) return chapter
    if (chapter.children) {
      for (const child of chapter.children) {
        if (child.id === id) return child
      }
    }
  }
  return undefined
}

