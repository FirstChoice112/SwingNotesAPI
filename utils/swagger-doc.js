/**
 * @openapi
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         text:
 *           type: string
 *         createdAt:
 *           type: string
 *         noteId:
 *           type: string
 *
 * /api/user/signup:
 *   post:
 *     summary: Skapa ett nytt konto för användaren
 *     description: Används för att skapa ett nytt konto för användaren.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Konto skapat framgångsrikt.
 *       '400':
 *         description: Felaktig förfrågan.
 */

/**
 * @openapi
 * /api/user/signup:
 *   post:
 *     summary: Skapa ett nytt konto för användaren
 *     description: Används för att skapa ett nytt konto för användaren.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Konto skapat framgångsrikt.
 *       '400':
 *         description: Felaktig förfrågan.
 */
/**
 * @openapi
 * /api/user/login:
 *   post:
 *     summary: Logga in användaren
 *     description: Används för att logga in användaren med användarnamn och lösenord.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Användaren loggades in framgångsrikt.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: "jwt_token_here"
 *       '401':
 *         description: Ogiltig inloggningsförsök.
 */
/**
 * @openapi
 * /api/notes/{userId}:
 *   get:
 *     summary: Hämta alla anteckningar för en användare
 *     description: Används för att hämta alla anteckningar för en specifik användare.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Användarens ID för att hämta anteckningar för.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Användarens anteckningar hämtades framgångsrikt.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       '404':
 *         description: Användaren hittades inte.
 *       '500':
 *         description: Intern serverfel.
 */
/**
 * @openapi
 * /api/notes/{userId}:
 *   post:
 *     summary: Skapa en ny anteckning för en användare
 *     description: Används för att skapa en ny anteckning för en specifik användare.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Användarens ID att skapa anteckningen för.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Anteckningen skapades framgångsrikt.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indikerar om operationen lyckades.
 *                 note:
 *                   $ref: '#/components/schemas/Note'
 *       '400':
 *         description: Felaktig förfrågan.
 */
/**
 * @openapi
 * /api/notes/{noteId}:
 *   put:
 *     summary: Uppdatera en befintlig anteckning
 *     description: Används för att uppdatera en befintlig anteckning med ny titel och text.
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         description: Anteckningens ID att uppdatera.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Anteckningen uppdaterades framgångsrikt.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indikerar om operationen lyckades.
 *                 message:
 *                   type: string
 *                   description: Meddelande som indikerar att anteckningen uppdaterades.
 *                 note:
 *                   $ref: '#/components/schemas/Note'
 *       '400':
 *         description: Felaktig förfrågan.
 *       '404':
 *         description: Anteckningen hittades inte.
 */
/**
 * @openapi
 * /api/notes/{noteId}:
 *   delete:
 *     summary: Ta bort en anteckning
 *     description: Används för att ta bort en befintlig anteckning.
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         description: Anteckningens ID att ta bort.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Anteckningen togs bort framgångsrikt.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indikerar om operationen lyckades.
 *                 message:
 *                   type: string
 *                   description: Meddelande som indikerar att anteckningen togs bort.
 *       '400':
 *         description: Felaktig förfrågan.
 *       '404':
 *         description: Anteckningen hittades inte.
 */
