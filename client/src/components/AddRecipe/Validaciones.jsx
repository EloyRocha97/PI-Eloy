export function AddRecipeValidate(input, allRecipes) {
    console.log("input", input);
    let errors = {};

    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    if (!input.name) {
        errors.name = "Name is required";
    } else {
        if (!regexName.test(input.name.trim())) {
            errors.name = "Name: only letters and blanks spaces";
        }
    }

    if (!input.healthScore) {
        var reg = /\d{2}/;
        console.log("holaaaaaaaaaaa", input.healthScore)
        if (!reg.test(input.healthScore)) {
            errors.healthScore = "healthScore: ¡Ingrese un número entero de 1 - 100!";
        }
    }

    if (!input.summary) {
        errors.summary = "Tiene que tener al menos un dato";
    }


    if (!input.dietId.length && !input.diet.length) {
        errors.dietId = "Add at least one diet";
    }

    if (!isValidHttpUrl(input.img)) {
        errors.img = "Url invalid";
    }

    console.log("errors", errors);
    return errors;
}

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

export function AddRecipeObj(input) {
    var obj = {
        name: "",
        img: "",
        dietTypes: [],
        summary: "",
        healthScore: "",
    };
    obj.name = input.name;
    obj.img = input.img;
    obj.dietTypes = input.dietTypes;
    obj.healthScore = input.healthScore;
    obj.summary = input.summary;

    return obj;
}

export function btn(response, handleOk, handleSubmit) {
    let button;
    if (response === "Creado correctamente") {
        button = (
            <input
                type="submit"
                value="Siguiente"
                id="form_button"
                onClick={handleOk}
            />
        );
    } else {
        button = (
            <input
                type="submit"
                value="Created"
                id="form_button"
                onClick={handleSubmit}
            />
        );
    }
    return button;
}
