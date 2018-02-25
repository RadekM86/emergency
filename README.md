# Straż Pożarna UI :fire_engine: 



Aplikacja one-page sprawdzająca połączenia między miastami z jednostkami straży pożarnej i bez

## Instrukcja

Formularz aplikacji służy do dodawania miast, z zaznaczeniem czy posiada ono jednostkę straży pożarnej i łączących je dróg
oraz do podawania czasu przejazdu między miastami.

### Instrukcja instalacji

Przed uruchomieniem aplikacji należy zainstalować node i npm
* [node](https://nodejs.org/en/download/current/)

żeby sprawdzić czy mamy już zainstalowany node wpisujemy w terminalu:

```
node -v
```
Do działania aplikacji potrzebujemy zbudować 'fake REST API'
Do zbudowania komunikacji z wirtualnym backendem posłuży JSONserver:

```
$ npm install -g json-server
```
Za bazę danych służącą do zbudowania api posłuży plik db.json.
W paczce znajduje się plik package.json, więc do instalacji json-server lokalnie wystarczy w ścieżce folderu z aplikacją wpisać w terminalu:

```
$ npm i
```

NPM zainstaluje wszystkie niezbędne 'dependencies'.

### Uruchomienie aplikacji

Plik package json zawiera skrypt uruchamiający lokalny serwer, pozostając w odpowiedniej ścieżce folderu wpisujemy w terminalu:

```
npm run serve
```

lub możemy go uruchomić ręcznie

```
$ json-server --watch db.json
```

W przeglądarce wystarczy wpisać adres:

```
localhost:3000
```
JSON server będzie serwował pliki z folderu public.

## Testy

Aplikacja została przetestowana manualnie, bez testów jednostkowych.

### Działanie aplikacji

Aplikacja zakłada, że istnieją miasta połączone drogami o wyznaczonym czasie przejazdu (w obie strony). Mamy więc do czynienia z grafem ważonym nieskierowanym. Do wyznaczenia najkrótszej ścieżki między wierzchołkami grafu (miastami) w zadanym czasie (max) służy algorytm zbliżony do algorytmu Dijkstry.
Algorytm jest funkcją rekurencyjną, której można zadać różne parametry.
Do budowy i dołączana komponentów do drzewa DOM posłużyły selektory jquery.

### Działanie serwera

Składniki aplikacji pobierają, wysyłają i usuwają dane w pliku db.json za pomocą funkcji jquery $ajax (GET, POST, DELETE), poza jednym przypadkiem, opisanym poniżej.

***Błędy*** :exclamation:

W czasie wysyłania polecenia w postaci obiektu z tablicą jako parametr do serwera za pomocją $ajax POST, pojawiły się błędy w nazwie i parametrze, które uniemożliwiły prawidłowe pobranie danych z powrotem.
W tym przypadku $ajax został zastąpiony przez fetch() z parsowaniem do formatu JSON.

### Składniki aplikacji

> [czcionka z google fonts](https://fonts.google.com/specimen/Roboto)
> [ikony z Font Awesome](https://fontawesome.com/)


