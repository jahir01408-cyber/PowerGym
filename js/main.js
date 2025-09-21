(function ($) {
    "use strict";

    $(document).ready(function () {
        // --- Dropdown on mouse hover ---
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);

        // --- Back to top button ---
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.back-to-top').fadeIn('slow');
            } else {
                $('.back-to-top').fadeOut('slow');
            }
        });
        $('.back-to-top').click(function () {
            $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
            return false;
        });

        // --- Calculadora IMC ---
        $('#calc-btn').on('click', function () {
            const weightStr = $('#weight').val().trim();
            const heightStr = $('#height').val().trim();

            if (!weightStr || !heightStr) {
                alert('Por favor ingresa tu peso (kg) y altura (cm).');
                return;
            }

            const weight = parseFloat(weightStr.replace(',', '.'));
            const heightCm = parseFloat(heightStr.replace(',', '.'));

            if (isNaN(weight) || isNaN(heightCm) || weight <= 0 || heightCm <= 0) {
                alert('Ingresa valores numéricos válidos para peso y altura.');
                return;
            }

            const heightM = heightCm / 100;
            const bmi = weight / (heightM * heightM);
            const bmiRounded = Math.round(bmi * 10) / 10;

            let category = '';
            if (bmi < 18.5) category = 'Bajo peso';
            else if (bmi < 25) category = 'Normal';
            else if (bmi < 30) category = 'Sobrepeso';
            else category = 'Obesidad';

            let recommendation = '';
            if (bmi < 18.5) recommendation = 'Recomendación: Considera un plan de VOLUMEN con enfoque en ganancia de masa y alimentación hipercalórica saludable.';
            else if (bmi < 25) recommendation = 'Recomendación: Mantener y optimizar cuerpo (puedes elegir DEFINICIÓN para marcar músculo o VOLUMEN si quieres ganar masa).';
            else recommendation = 'Recomendación: Enfócate en DEFINICIÓN y pérdida de grasa con dieta hipocalórica y entrenamiento combinado (fuerza + cardio).';

            $('#bmi-value').text('IMC: ' + bmiRounded);
            $('#bmi-category').text('Categoría: ' + category);
            $('#bmi-recommendation').text(recommendation);
            $('#bmi-result').show();
        });
    });
})(jQuery);

