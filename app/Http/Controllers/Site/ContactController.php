<?php

namespace App\Http\Controllers\Site;

use App\Models\Article;
use App\Http\Controllers\Controller;
use App\Mail\RequestContact;
use App\Mail\RequestSimulator;
use App\Models\Banner;
use App\Models\Benefit;
use App\Models\Finality;
use App\Models\Financier;
use App\Models\Partner;
use App\Models\Step;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{

    const IMO_TYPE = [ 1 => 'Casa', 2 => 'Área rural', 3 => 'Empresa'];
    const ESTADOS = array(
        'AC' => 'Acre',
        'AL' => 'Alagoas',
        'AP' => 'Amapá',
        'AM' => 'Amazonas',
        'BA' => 'Bahia',
        'CE' => 'Ceará',
        'DF' => 'Distrito Federal',
        'ES' => 'Espirito Santo',
        'GO' => 'Goiás',
        'MA' => 'Maranhão',
        'MS' => 'Mato Grosso do Sul',
        'MT' => 'Mato Grosso',
        'MG' => 'Minas Gerais',
        'PA' => 'Pará',
        'PB' => 'Paraíba',
        'PR' => 'Paraná',
        'PE' => 'Pernambuco',
        'PI' => 'Piauí',
        'RJ' => 'Rio de Janeiro',
        'RN' => 'Rio Grande do Norte',
        'RS' => 'Rio Grande do Sul',
        'RO' => 'Rondônia',
        'RR' => 'Roraima',
        'SC' => 'Santa Catarina',
        'SP' => 'São Paulo',
        'SE' => 'Sergipe',
        'TO' => 'Tocantins',
    );

    public function contact(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:6|max:50',
            'phone' => 'required|string',
            'email' => 'required|email',
            'subject' => 'nullable|string',
            'newsletter' => 'nullable|int',
            'message' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return redirect(url()->previous().'#contact')->withErrors($validator->errors());
        }

        $attrs = Arr::only($request->all(), array_keys($validator->getRules()));

        Mail::to(env('MAIL_TO'))->send(new RequestContact($attrs));

        return redirect(url()->previous().'#contact')->with('msg', 'Enviado com êxito. Em breve entraremos em contato.');
    }

    public function simulator(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:6|max:50',
            'phone' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'uf' => 'required|string',
            'email' => 'required|email',
            'document' => 'nullable|string',
            'media_light' => 'required|string',
            'type' => 'required|int',
        ]);

        if ($validator->fails()) {
            return redirect(url()->previous().'#simulator')->withErrors($validator->errors());
        }

        $attrs = Arr::only($request->all(), array_keys($validator->getRules()));
        $attrs['type'] = self::IMO_TYPE[$attrs['type']];

        Mail::to(env('MAIL_TO'))->send(new RequestSimulator($attrs));

        return redirect(url()->previous().'#simulator')->with('msg', 'Obrigado, nosso time comercial irá agora levantar as melhores e mais econômicas soluções em energia solar para você e logo entraremos em contato');
    }

    public function simulatorFast(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:6|max:50',
            'phone' => 'required|string',
            'email' => 'required|email',
            'type' => 'required|int',
        ]);

        if ($validator->fails()) {
            return redirect(url()->previous())->withErrors($validator->errors());
        }

        $attrs = Arr::only($request->all(), array_keys($validator->getRules()));
        $attrs['type'] = self::IMO_TYPE[$attrs['type']];

        Mail::to(env('MAIL_TO'))->send(new RequestSimulator($attrs));

        return redirect(url()->previous())->with('msg', 'Obrigado, nosso time comercial irá agora levantar as melhores e mais econômicas soluções em energia solar para você e logo entraremos em contato');
    }
}
