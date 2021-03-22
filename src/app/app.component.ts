import {Component, OnInit, ViewChild} from '@angular/core';
import {JsonEditorComponent, JsonEditorOptions} from 'ang-jsoneditor';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public editorOptions: JsonEditorOptions;
  public data: any;

  public editorOptions2: JsonEditorOptions;
  public data2: any;

  public showData;

  public EditedData;

  public show = false;

  @ViewChild('editor', { static: false }) editor: JsonEditorComponent;
  @ViewChild('editorTwo', { static: false }) editorTwo: JsonEditorComponent;

  public form;
  public formData;

  dataMulti: any = {
    products: [{
      name: 'car',
      product: [{
        name: 'honda',
        model: [
          { id: 'civic', name: 'civic' },
          { id: 'accord', name: 'accord' },
          { id: 'crv', name: 'crv' },
          { id: 'pilot', name: 'pilot' },
          { id: 'odyssey', name: 'odyssey' }
        ]
      }]
    },
      {
        name: 'book',
        product: [{
          name: 'dostoyevski',
          model: [
            { id: 'Axe', name: 'Axe' },
            { id: 'accord', name: 'accord' },
            { id: 'crv', name: 'crv' },
            { id: 'pilot', name: 'pilot' },
            { id: 'odyssey', name: 'odyssey' }
          ]
        }]
      }
    ]
  };

  constructor(public fb: FormBuilder) {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.schema = {
      definitions: {},
      $schema: 'http://json-schema.org/draft-07/schema#',
      $id: 'http://example.com/root.json',
      type: 'object',
      title: 'The Root Schema',
      required: [
        'randomNumber',
        'products'
      ],
      properties: {
        randomNumber: {
          $id: '#/properties/randomNumber',
          type: 'integer',
          title: 'The Randomnumber Schema',
          default: 0,
          examples: [
            10
          ],
          enum: [1, 2, 3, 4, 5, 6, 7, 8]
        },
        products: {
          $id: '#/properties/products',
          type: 'array',
          title: 'The Products Schema',
          items: {
            $id: '#/properties/products/items',
            type: 'object',
            title: 'The Items Schema',
            required: [
              'name',
              'product'
            ],
            properties: {
              name: {
                $id: '#/properties/products/items/properties/name',
                type: 'string',
                title: 'The Name Schema',
                default: '',
                examples: [
                  'car'
                ],
                pattern: '^(.*)$'
              },
              product: {
                $id: '#/properties/products/items/properties/product',
                type: 'array',
                title: 'The Product Schema',
                items: {
                  $id: '#/properties/products/items/properties/product/items',
                  type: 'object',
                  title: 'The Items Schema',
                  required: [
                    'name',
                    'model'
                  ],
                  properties: {
                    name: {
                      $id: '#/properties/products/items/properties/product/items/properties/name',
                      type: 'string',
                      title: 'The Name Schema',
                      default: '',
                      examples: [
                        'honda'
                      ],
                      pattern: '^(.*)$'
                    },
                    model: {
                      $id: '#/properties/products/items/properties/product/items/properties/model',
                      type: 'array',
                      title: 'The Model Schema',
                      items: {
                        $id: '#/properties/products/items/properties/product/items/properties/model/items',
                        type: 'object',
                        title: 'The Items Schema',
                        required: [
                          'id',
                          'name'
                        ],
                        properties: {
                          id: {
                            $id: '#/properties/products/items/properties/product/items/properties/model/items/properties/id',
                            type: 'string',
                            title: 'The Id Schema',
                            default: '',
                            examples: [
                              'civic'
                            ],
                            pattern: '^(.*)$'
                          },
                          name: {
                            $id: '#/properties/products/items/properties/product/items/properties/model/items/properties/name',
                            type: 'string',
                            title: 'The Name Schema',
                            default: '',
                            examples: [
                              'civic'
                            ],
                            pattern: '^(.*)$'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    this.initEditorOptions(this.editorOptions);

    this.editorOptions2 = new JsonEditorOptions();
    this.initEditorOptions(this.editorOptions2);
  }

  ngOnInit() {
    this.data = {
      randomNumber: 2,
      products: [
        {
          name: 'car',
          product:
            [
              {
                name: 'honda',
                model: [
                  { id: 'civic', name: 'civic' },
                  { id: 'accord', name: 'accord' }, { id: 'crv', name: 'crv' },
                  { id: 'pilot', name: 'pilot' }, { id: 'odyssey', name: 'odyssey' }
                ]
              }
            ]
        }
      ]
    };

    this.data2 = {
      nedata: 'test'
    };

    this.form = this.fb.group({
      myinput: [this.data2]
    });

    // this.editorOptions.onChange = this.changeLog.bind(this);
  }

  // tslint:disable-next-line:typedef
   changeLog(event = null) {
    console.log(event);
    console.log('change:', this.editor);
    console.log('change2:', this.editorTwo);
    this.showData = this.editorTwo.get();
  }

  // tslint:disable-next-line:typedef
  changeEvent(event) {
    console.log(event);
  }

  // tslint:disable-next-line:typedef
  initEditorOptions(editorOptions) {
    // this.editorOptions.mode = 'code'; // set only one mode
    editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    // this.editorOptions.ace = (<any>window).ace.edit('editor');
  }

  // tslint:disable-next-line:typedef
  setLanguage(lang) {
    this.editorOptions.language = lang; // force a specific language, ie. pt-BR
    this.editor.setOptions(this.editorOptions);
  }

  // tslint:disable-next-line:typedef
  setAce() {
    const aceEditor = (window as any).ace.edit(document.querySelector('#a' + this.editor.id + '>div'));
    // custom your ace here
    aceEditor.setReadOnly(true);
    aceEditor.setFontSize('110pt');
    this.editorOptions.ace = aceEditor;
    this.editor.setOptions(this.editorOptions);
  }

  // tslint:disable-next-line:typedef
  toggleNav() {
    this.editorOptions.navigationBar = !this.editorOptions.navigationBar;
    this.editor.setOptions(this.editorOptions);
  }

  // tslint:disable-next-line:typedef
  toggleStatus() {
    this.editorOptions.statusBar = !this.editorOptions.statusBar;
    this.editor.setOptions(this.editorOptions);
  }

  // tslint:disable-next-line:typedef
  customLanguage() {
    this.editorOptions.languages = {
      'pt-BR': {
        auto: 'Automático testing'
      },
      en: {
        auto: 'Auto testing'
      }
    };
    this.editor.setOptions(this.editorOptions);
  }

  // tslint:disable-next-line:typedef
  changeObject() {
    this.data.randomNumber = Math.floor(Math.random() * 8);
  }

  // tslint:disable-next-line:typedef
  changeData() {
    this.data = Object.assign({}, this.data,
      { randomNumber: Math.floor(Math.random() * 8) });
  }

  /**
   * Example on how get the json changed from the jsoneditor
   */
  // tslint:disable-next-line:typedef
  getData() {
    const changedJson = this.editor.get();
    console.log(changedJson);
  }

  // tslint:disable-next-line:typedef
  print(v) {
    return JSON.stringify(v, null, 2);
  }

  // tslint:disable-next-line:typedef
  submit() {
    this.formData = JSON.stringify(this.form.value, null, 2);
    console.log(this.form.value);
  }

  // tslint:disable-next-line:typedef
  showJson(d) {
    console.log(d);
    this.EditedData = JSON.stringify(d, null, 2);
  }

  makeOptions = () => {
    return new JsonEditorOptions();
  }
}
