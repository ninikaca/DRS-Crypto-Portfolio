/**
 * Kreira sesiju za korisnika i čuva podatke u localStorage.
 * @param {string} email - Email korisnika.
 * @param {string} lozinka - Lozinka korisnika.
 * @returns {boolean} - Vraća true ako je sesija uspešno kreirana, inače false.
 */
export const kreiraj_sesiju = (email, lozinka) => {
    // Proverava da li su prosleđeni email i lozinka
    if (email !== "" && lozinka !== "") {
        localStorage.setItem('korisnik', JSON.stringify({ email, lozinka }));
        return true; // Sesija je uspešno kreirana
    } else {
        return false; // Sesija nije kreirana zbog nedostajućih podataka
    }
};

/**
 * Proverava da li postoje sačuvani korisnički podaci u localStorage-u.
 * @returns {Object|null} - Vraća parsirane korisničke podatke ako postoje, inače null.
 */
export const proveri_sesiju = () => {
    const sacuvaniPodaci = localStorage.getItem('korisnik');

    if (sacuvaniPodaci) {
        try {
            const parsiraniPodaci = JSON.parse(sacuvaniPodaci);
            return parsiraniPodaci; // Vraća korisničke podatke ako su prisutni
        } catch (error) {
            console.error('Greška pri parsiranju sačuvanih korisničkih podataka');
            return null; // Vraća null ako dođe do greške pri parsiranju
        }
    } else {
        return null; // Vraća null ako nema podataka u localStorage-u
    }
};

/**
 * Završava korisničku sesiju brisanjem podataka iz localStorage-a.
 */
export const zavrsi_sesiju = () => {
    localStorage.removeItem('korisnik');
    console.log('Sesija je završena. Podaci korisnika su obrisani.');
};
