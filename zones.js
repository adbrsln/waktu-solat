/**
 * Mapping of Malaysian States and Districts to JAKIM Prayer Time Zones.
 * Source derived from JAKIM e-Solat data.
 */

export const ZONE_MAPPING = {
    "JOHOR": {
        "PULAU AUR": "JHR01", "PULAU PEMANGGIL": "JHR01",
        "JOHOR BAHRU": "JHR02", "KOTA TINGGI": "JHR02", "MERSING": "JHR02", "KULAI": "JHR02",
        "KLUANG": "JHR03", "PONTIAN": "JHR03",
        "BATU PAHAT": "JHR04", "MUAR": "JHR04", "SEGAMAT": "JHR04", "GEMAS JOHOR": "JHR04", "TANGKAK": "JHR04"
    },
    "KEDAH": {
        "KOTA SETAR": "KDH01", "KUBANG PASU": "KDH01", "POKOK SENA": "KDH01",
        "KUALA MUDA": "KDH02", "YAN": "KDH02", "PENDANG": "KDH02",
        "PADANG TERAP": "KDH03", "SIK": "KDH03",
        "BALING": "KDH04",
        "BANDAR BAHARU": "KDH05", "KULIM": "KDH05",
        "LANGKAWI": "KDH06",
        "GUNUNG JERAI": "KDH07"
    },
    "KELANTAN": {
        "KOTA BHARU": "KTN01", "BACHOK": "KTN01", "PASIR PUTEH": "KTN01", "TUMPAT": "KTN01",
        "PASIR MAS": "KTN01", "TANAH MERAH": "KTN01", "MACHANG": "KTN01", "KUALA KRAI": "KTN01",
        "MUKIM CHIKU": "KTN01",
        "JELI": "KTN03", "GUA MUSANG": "KTN03", "LIGU": "KTN03"
    },
    "MELAKA": {
        "SELURUH NEGERI MELAKA": "MLK01", "MELAKA": "MLK01", "ALOR GAJAH": "MLK01", "JASIN": "MLK01"
    },
    "NEGERI SEMBILAN": {
        "TAMPIN": "NGS01", "JEMPOL": "NGS01",
        "JELEBU": "NGS02", "KUALA PILAH": "NGS02",
        "PORT DICKSON": "NGS02", "REMBAU": "NGS02", "SEREMBAN": "NGS02"
    },
    "PAHANG": {
        "PULAU TIOMAN": "PHG01",
        "KUANTAN": "PHG02", "PEKAN": "PHG02", "ROMPIN": "PHG02", "MUADZAM SHAH": "PHG02",
        "JERANTUT": "PHG03", "TEMERLOH": "PHG03", "MARAN": "PHG03", "BERA": "PHG03", "CHENOR": "PHG03", "JENGKA": "PHG03",
        "BENTONG": "PHG04", "LIPIS": "PHG04", "RAUB": "PHG04",
        "GENTING SEMPAH": "PHG05", "JANDA BAIK": "PHG05", "BUKIT TINGGI": "PHG05",
        "CAMERON HIGHLANDS": "PHG06", "GENTING HIGHLANDS": "PHG06", "BUKIT FRASER": "PHG06"
    },
    "PERAK": {
        "TAPAH": "PRK01", "SLIM RIVER": "PRK01", "TANJUNG MALIM": "PRK01",
        "KUALA KANGSAR": "PRK02", "SUNGAI SIPUT": "PRK02", "IPOH": "PRK02", "BATU GAJAH": "PRK02", "KAMPAR": "PRK02",
        "LENGGONG": "PRK03", "PENGKALAN HULU": "PRK03", "GRIK": "PRK03",
        "TEMENGOR": "PRK04", "BELUM": "PRK04",
        "KAMPUNG GAJAH": "PRK05", "TELUK INTAN": "PRK05", "BAGAN DATUK": "PRK05", "SERI ISKANDAR": "PRK05", "BERUAS": "PRK05", "PARIT": "PRK05", "LUMUT": "PRK05", "SITIAWAN": "PRK05", "PULAU PANGKOR": "PRK05",
        "SELAMA": "PRK06", "TAIPING": "PRK06", "BAGAN SERAI": "PRK06", "PARIT BUNTAR": "PRK06",
        "BUKIT LARUT": "PRK07"
    },
    "PERLIS": {
        "KANGAR": "PLS01", "PADANG BESAR": "PLS01", "ARAU": "PLS01"
    },
    "PULAU PINANG": {
        "PULAU PINANG": "PNG01", "SEBERANG PERAI": "PNG01", "TIMUR LAUT": "PNG01", "BARAT DAYA": "PNG01"
    },
    "SABAH": {
        "BAHAGIAN SANDAKAN": "SBH01", "BUKIT GARAM": "SBH01", "SEMAWANG": "SBH01", "TEMANGGONG": "SBH01", "TAMBISAN": "SBH01", "BANDAR TIMUR": "SBH01", "SUKAU": "SBH01",
        "BELURAN": "SBH02", "TELUPID": "SBH02", "PINANG-AH": "SBH02", "TERUSAN": "SBH02", "KUAMUT": "SBH02", "BAHAGIAN LABUK": "SBH02", "SUGUT": "SBH02",
        "LAHAD DATU": "SBH03", "SILABUKAN": "SBH03", "KUNAK": "SBH03", "SAHABAT": "SBH03", "TUNGKU": "SBH03", "SATTAY": "SBH03",
        "TAWAU": "SBH04", "BALONG": "SBH04", "MEROTAI": "SBH04", "KALABAKAN": "SBH04", "SEMPORNA": "SBH04",
        "KUDAT": "SBH05", "KOTA MARUDU": "SBH05", "PITAS": "SBH05", "PULAU BANGGI": "SBH05",
        "GUNUNG KINABALU": "SBH06",
        "KOTA KINABALU": "SBH07", "RANAU": "SBH07", "KOTA BELUD": "SBH07", "TUARAN": "SBH07", "PENAMPANG": "SBH07", "PAPAR": "SBH07", "PUTATAN": "SBH07",
        "KUALA PENYU": "SBH08", "BEAUFORT": "SBH08", "SIPITANG": "SBH08", "TENOM": "SBH08", "LONG PASIA": "SBH08", "MEMBAKUT": "SBH08", "WESTON": "SBH08",
        "SIPITANG": "SBH09", "LONG PASIA": "SBH09", "TENOM": "SBH09", "NABAWAN": "SBH09", "KENINGAU": "SBH09", "TAMBUNAN": "SBH09", "PENSIANGAN": "SBH09"
    },
    "SARAWAK": {
        "LIMBANG": "SWK01", "LAWAS": "SWK01", "SUNDAR": "SWK01", "TRUSAN": "SWK01",
        "MIRI": "SWK02", "NIAH": "SWK02", "BEKENU": "SWK02", "SIBUTI": "SWK02", "MARUDI": "SWK02",
        "PANDAN": "SWK03", "BELAGA": "SWK03", "SUAI": "SWK03", "TATAU": "SWK03", "SEBAUH": "SWK03", "BINTULU": "SWK03",
        "SIBU": "SWK04", "MUKAH": "SWK04", "DALAT": "SWK04", "SONG": "SWK04", "IGAN": "SWK04", "OYA": "SWK04", "BALINGIAN": "SWK04", "KANOWIT": "SWK04", "KAPIT": "SWK04",
        "SARIKEI": "SWK05", "MATU": "SWK05", "JULAU": "SWK05", "RAJANG": "SWK05", "DARO": "SWK05", "BINTANGOR": "SWK05", "BELAWAI": "SWK05",
        "LUBOK ANTU": "SWK06", "SRI AMAN": "SWK06", "ROBAN": "SWK06", "DEBAK": "SWK06", "KABONG": "SWK06", "LINGGA": "SWK06", "ENGKELILI": "SWK06", "BETONG": "SWK06", "SPAOH": "SWK06", "PUSA": "SWK06", "SARATOK": "SWK06",
        "SERIAN": "SWK07", "SIMUNJAN": "SWK07", "SAMARAHAN": "SWK07", "SEBUYAU": "SWK07", "MELUDAM": "SWK07",
        "KUCHING": "SWK08", "BAU": "SWK08", "LUNDU": "SWK08", "SEMATAN": "SWK08",
        "KAMPUNG PATARIKAN": "SWK09"
    },
    "SELANGOR": {
        "GOMBAK": "SGR01", "PETALING": "SGR01", "SEPANG": "SGR01", "HULU LANGAT": "SGR01", "HULU SELANGOR": "SGR01", "SHAH ALAM": "SGR01", "SUBANG JAYA": "SGR01",
        "KUALA SELANGOR": "SGR02", "SABAK BERNAM": "SGR02",
        "KLANG": "SGR03", "KUALA LANGAT": "SGR03"
    },
    "TERENGGANU": {
        "KUALA TERENGGANU": "TRG01", "MARANG": "TRG01", "KUALA NERUS": "TRG01",
        "BESUT": "TRG02", "SETIU": "TRG02",
        "HULU TERENGGANU": "TRG03",
        "DUNGUN": "TRG04", "KEMAMAN": "TRG04"
    },
    "WILAYAH PERSEKUTUAN": {
        "KUALA LUMPUR": "WLY01", "PUTRAJAYA": "WLY01",
        "LABUAN": "WLY02"
    }
};

export function determineZone(state, district) {
    // Normalize inputs
    if (!state) return null;
    const normalizedState = state.toUpperCase();

    // Direct State Mapping (for single zone states or fallbacks)
    if (normalizedState === "PULAU PINANG") return "PNG01";
    if (normalizedState === "PERLIS") return "PLS01";
    if (normalizedState === "MELAKA") return "MLK01";

    const stateZones = ZONE_MAPPING[normalizedState];
    if (!stateZones) {
        // Handle Wilayah Persekutuan variations
        if (normalizedState.includes("KUALA LUMPUR") || normalizedState.includes("PUTRAJAYA")) return "WLY01";
        if (normalizedState.includes("LABUAN")) return "WLY02";
        return null;
    }

    if (!district) return null;
    const normalizedDistrict = district.toUpperCase();

    // Check strict match first
    for (const [key, value] of Object.entries(stateZones)) {
        if (normalizedDistrict.includes(key)) {
            return value;
        }
    }

    // Default fallback for KL/Putrajaya if state checks fail but district matches
    if (normalizedDistrict.includes("KUALA LUMPUR") || normalizedDistrict.includes("PUTRAJAYA")) return "WLY01";

    return null;
}
