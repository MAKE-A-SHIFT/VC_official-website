const fs = require('fs');
const i18nPath = 'src/i18n/index.ts';
let i18nContent = fs.readFileSync(i18nPath, 'utf8');

const accTrans = {
  fr: { tjManageAcc: "Gestion des Comptes", tjNoAcc: "Aucun compte créé.", tjAddAccBtn: "Ajouter un compte", tjRenameBtn: "Renommer", tjDeleteBtn: "Supprimer" },
  it: { tjManageAcc: "Gestione dei Conti", tjNoAcc: "Nessun conto creato.", tjAddAccBtn: "Aggiungi un conto", tjRenameBtn: "Rinomina", tjDeleteBtn: "Elimina" },
  es: { tjManageAcc: "Gestión de Cuentas", tjNoAcc: "Ninguna cuenta creada.", tjAddAccBtn: "Añadir una cuenta", tjRenameBtn: "Renombrar", tjDeleteBtn: "Eliminar" },
  de: { tjManageAcc: "Kontoverwaltung", tjNoAcc: "Kein Konto erstellt.", tjAddAccBtn: "Konto hinzufügen", tjRenameBtn: "Umbenennen", tjDeleteBtn: "Löschen" },
  ru: { tjManageAcc: "Управление счетами", tjNoAcc: "Счета не созданы.", tjAddAccBtn: "Добавить счет", tjRenameBtn: "Переименовать", tjDeleteBtn: "Удалить" },
  ja: { tjManageAcc: "口座管理", tjNoAcc: "口座が作成されていません。", tjAddAccBtn: "口座を追加", tjRenameBtn: "名前を変更", tjDeleteBtn: "削除" }
};

for (const lang in accTrans) {
  const transKeys = Object.entries(accTrans[lang]).map(([k, v]) => `${k}: "${v}"`).join(', ');
  const langRegex = new RegExp(`(${lang}: \\{)`);
  if (i18nContent.match(langRegex)) {
    i18nContent = i18nContent.replace(langRegex, `$1\n    ${transKeys},`);
  }
}

fs.writeFileSync(i18nPath, i18nContent);
console.log('Updated i18n/index.ts with Account Manager strings.');

let tj = fs.readFileSync('src/components/tools/TradingJournal.tsx', 'utf8');
tj = tj.replace(/Gestion des Comptes/g, '{tRoot.tjManageAcc}');
tj = tj.replace(/Aucun compte créé\./g, '{tRoot.tjNoAcc}');
tj = tj.replace(/Ajouter un compte/g, '{tRoot.tjAddAccBtn}');
tj = tj.replace(/title="Renommer"/g, 'title={tRoot.tjRenameBtn}');
tj = tj.replace(/title="Supprimer"/g, 'title={tRoot.tjDeleteBtn}');
fs.writeFileSync('src/components/tools/TradingJournal.tsx', tj);
console.log('Updated TradingJournal.tsx');
