export const extractAIInsights = (summary: string) => {
  let actions = ["Lakukan pemeriksaan visual pada komponen terkait."];
  let impacts = ["Potensi penurunan performa mesin."];

  const actionMatch = summary.match(/(?:perlu dilakukan pengecekan|langkah perbaikan|rekomendasi|solusi)[:\s]+([^.]+)/i);
  
  if (actionMatch && actionMatch[1]) {
    actions = actionMatch[1]
      .split(/,|dan\s|serta\s/)
      .map(s => s.trim())
      .filter(s => s.length > 5); 
  }

  const impactMatch = summary.match(/(?:jika dibiarkan|dampak|akibatnya)[,\s]+dapat menyebabkan[:\s]+([^.]+)/i);

  if (impactMatch && impactMatch[1]) {
    impacts = impactMatch[1]
      .split(/,|dan\s|serta\s/)
      .map(s => s.trim())
      .filter(s => s.length > 3);
  }

  return { actions, impacts };
};