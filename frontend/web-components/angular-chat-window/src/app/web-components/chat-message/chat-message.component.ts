import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { Message } from '../models/message';

const linkRegEx = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/i;

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent implements AfterViewInit{
  @Input() apiEndpoint: string;
  @Input() debug: boolean;
  link: string;
  // tslint:disable-next-line:variable-name
  private _message: Message;

  get message(): Message {
    return this._message;
  }

  @Input() set message(value: Message) {
    this._message = value;

    this.extractLink(value.message);
  }

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {
  }

  private extractLink(message: string) {
    this.link = '';

    const match = linkRegEx.exec(message);

    if (match) {
      this.link = match[0];
    }
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.scrollIntoView();
  }
}
