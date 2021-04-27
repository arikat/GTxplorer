export const settings = {
    title:"GTXplorer",
    show_legend: true,
    ui: {
        numberingMarginLeft: "12px",
        numberingMarginTop: "0px",
        numberingMinWidth: "20.95px"
    },
    options: [
        {
            id: "hierarchy",
            type: "checkbox",
            name: "Hierarchy",
            checked: true,
            visible: true
        },
        {
            id: "motif",
            type: "checkbox",
            name: "Motif",
            checked: false,
            visible: true
        },
        {
            id: "domain",
            type: "checkbox",
            name: "Domain Structure",
            checked: false,
            visible: true
        }
    ],
    elements: [
        {
            id: "pattern",
            type: "checkbox",
            name: "Pattern",
            dirpath: "patterns/png",
            extention: "png",
            checked: true,
            visible: true
        },
        {
            id: "weblogo",
            type: "checkbox",
            name: "Residue",
            dirpath: "sequences/png",
            extention: "png",
            checked: true,
            visible: false
        },
        {
            id: "nr_seq",
            type: "dropdown",
            visible: true,
            name: "Nr Sequences",
            options: [
                {
                    name: "Full-length seq",
                    dir: "data/db_files/FastaFull",
                    ext: "_nr.full.fasta"
                },
                {
                    name: "GT-A domain",
                    dir: "data/db_files/Fasta",
                    ext: "_nr.fasta"
                },
                {
                    name: "Table",
                    dir: "data/db_files/Tables",
                    ext: "_nr.tsv"
                },
            ]
        },
      ,

    ]
};
