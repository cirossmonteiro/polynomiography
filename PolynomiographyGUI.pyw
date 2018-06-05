from tkinter import *
import PLOT
import time

class App:
    def __init__(self,window):
        self.default1 = '1,-1,1j,-1j'
        self.default2 = '1,0,1,0,1'
        self.default4 = '-3'
        self.default5 = '3'
        self.default8 = '0.05'
        self.default10 = '2'
        self.default11 = '8'
        self.mainframe = Frame(window)
        self.mainframe.grid(row=0,column=0,padx=2,pady=3)

        self.var1 = IntVar()
        self.topframe = Frame(self.mainframe,relief = 'sunken',\
                              borderwidth = 1)
        self.topframe.grid(row = 0,column = 0,padx=2,pady=2,\
                           sticky = W+E,columnspan = 2)
        self.label_0 = Label(self.topframe,text="Input method:")
        self.label_0.grid(row = 0,column = 0,sticky = E)
        self.radio1 = Radiobutton(self.topframe,text = 'roots',\
                                  variable = self.var1,value=0,\
                                  command = self.callback0)
        self.radio1.grid(row = 0,column = 1,padx = 2,pady = 2)
        self.radio2 = Radiobutton(self.topframe,text = \
                                  'coefficients',\
                                  variable = self.var1,value=1,\
                                  command = self.callback1)
        self.radio2.grid(row = 0,column = 2,padx = 2,pady = 2,\
                         sticky = W)

        self.midframe1 = Frame(self.mainframe,relief = 'raised')
        self.midframe1.grid(row = 1,column = 0,padx = 1,pady=1,\
                            columnspan = 2)

        self.label_1 = Label(self.midframe1,text = "Roots")
        self.label_1.grid(row = 0,column = 0,padx = 1,pady = 1,\
                          sticky = E)

        self.entry_1 = Entry(self.midframe1,width = 32)
        self.entry_1.grid(row = 0,column = 1,padx = 1,pady = 1,\
                          columnspan = 2)
        self.entry_1.insert(0,self.default1)

        self.label_2 = Label(self.midframe1,text="Coefficients")
        self.label_2.grid(row = 1,column = 0,padx = 1,pady = 1,\
                          sticky = E)

        self.entry_2 = Entry(self.midframe1,width = 32)
        self.entry_2.grid(row = 1,column = 1,padx = 1,pady = 1,\
                          columnspan = 2)
        self.entry_2.insert(0,self.default2)
        self.entry_2.config(state = DISABLED)

        self.midframe2 = Frame(self.mainframe,relief = 'sunken',\
                               borderwidth = 1)
        self.midframe2.grid(row = 2,column = 0,padx = 1,pady=1,\
                            sticky = W+E)
        self.label_3 = Label(self.midframe2,text='Plot settings')
        self.label_3.grid(row=0,column=0,padx=1,pady=1,sticky=W)
        self.label_4 = Label(self.midframe2,text='xmin')
        self.label_4.grid(row=1,column=0,padx=1,pady=1,sticky=E)
        self.entry_4 = Entry(self.midframe2,width = 8)
        self.entry_4.grid(row = 1,column = 1,padx = 1,pady = 1)
        self.entry_4.insert(0,self.default4)
        self.label_5 = Label(self.midframe2,text='xmax')
        self.label_5.grid(row=2,column=0,padx=1,pady=1,sticky=E)
        self.entry_5 = Entry(self.midframe2,width = 8)
        self.entry_5.grid(row = 2,column = 1,padx = 1,pady = 1)
        self.entry_5.insert(0,self.default5)
        self.label_6 = Label(self.midframe2,text='ymin')
        self.label_6.grid(row=3,column=0,padx=1,pady=1,sticky=E)
        self.entry_6 = Entry(self.midframe2,width = 8)
        self.entry_6.grid(row = 3,column = 1,padx = 1,pady = 1)
        self.entry_6.insert(0,self.default4)
        self.label_7 = Label(self.midframe2,text='ymax')
        self.label_7.grid(row=4,column=0,padx=1,pady=1,sticky=E)
        self.entry_7 = Entry(self.midframe2,width = 8)
        self.entry_7.grid(row = 4,column = 1,padx = 1,pady = 1)
        self.entry_7.insert(0,self.default5)
        self.label_8 = Label(self.midframe2,text='step')
        self.label_8.grid(row=5,column=0,padx=1,pady=1,sticky=E)
        self.entry_8 = Entry(self.midframe2,width = 8)
        self.entry_8.grid(row = 5,column = 1,padx = 1,pady = 1)
        self.entry_8.insert(0,self.default8)

        self.midframe3 = Frame(self.mainframe,relief = 'sunken',\
                               borderwidth = 1)
        self.midframe3.grid(row = 2,column = 1,padx = 1,pady=1,\
                            sticky = W+E)
        self.button_0 = Button(self.midframe3,text='Plot basins\
 of attraction',command = self.basins)
        self.button_0.grid(row=0,column=0,padx=1,pady=1,sticky=\
                           W+E)
        self.button_1 = Button(self.midframe3,text='Plot basic\
 sequences',command = self.basic)
        self.button_1.grid(row=1,column=0,padx=1,pady=1,sticky=\
                           W+E)
        self.button_2 = Button(self.midframe3,text='Plot orbits'\
                               ,command = self.orbit)
        self.button_2.grid(row=2,column=0,padx=1,pady=1,sticky=\
                           W+E)
        self.button_3 = Button(self.midframe3,text='Reset'\
                               ,command = self.reset)
        self.button_3.grid(row=3,column=0,padx=1,pady=1,sticky=\
                           W+E)

        self.bottomframe = Frame(self.mainframe,relief='sunken',\
                               borderwidth = 1)
        self.bottomframe.grid(row=3,column=0,padx=1,pady=1,\
                            sticky = W+E,columnspan = 2)
        self.label_9 = Label(self.bottomframe,\
                             text='Polynomiograph parameters')
        self.label_9.grid(row=0,column=0,padx=1,pady=1,sticky=W)
        self.label_10 = Label(self.bottomframe,\
                             text='Iteration function \
order (m >=2)')
        self.label_10.grid(row=1,column=0,padx=1,pady=1,sticky=E)
        self.entry_10 = Entry(self.bottomframe,width = 8)
        self.entry_10.grid(row = 1,column = 1,padx = 1,pady = 1)
        self.entry_10.insert(0,self.default10)
        self.label_11 = Label(self.bottomframe,\
                             text='Number of sequence terms \
(n>0)')
        self.label_11.grid(row=2,column=0,padx=1,pady=1,sticky=E)
        self.entry_11 = Entry(self.bottomframe,width = 8)
        self.entry_11.grid(row = 2,column = 1,padx = 1,pady = 1)
        self.entry_11.insert(0,self.default11)

    def callback0(self):
        self.entry_1.config(state = NORMAL)
        self.entry_2.config(state = DISABLED)

    def callback1(self):
        self.entry_1.config(state = DISABLED)
        self.entry_2.config(state = NORMAL)

    def reset(self):
        self.entry_11.delete(0,END)
        self.entry_11.insert(0,self.default11)
        self.entry_10.delete(0,END)
        self.entry_10.insert(0,self.default10)
        self.entry_8.delete(0,END)
        self.entry_8.insert(0,self.default8)
        self.entry_7.delete(0,END)
        self.entry_7.insert(0,self.default5)
        self.entry_6.delete(0,END)
        self.entry_6.insert(0,self.default4)
        self.entry_5.delete(0,END)
        self.entry_5.insert(0,self.default5)
        self.entry_4.delete(0,END)
        self.entry_4.insert(0,self.default4)
        if self.var1.get() == 0:
            self.entry_1.delete(0,END)
            self.entry_1.insert(0,self.default1)
            self.entry_2.config(state = NORMAL)
            self.entry_2.delete(0,END)
            self.entry_2.insert(0,self.default2)
            self.entry_2.config(state = DISABLED)
        else:
            self.entry_2.delete(0,END)
            self.entry_2.insert(0,self.default1)
            self.entry_1.config(state = NORMAL)
            self.entry_1.delete(0,END)
            self.entry_1.insert(0,self.default2)
            self.entry_1.config(state = DISABLED)

    def getParameters(self):
        err = 0
        try:
            m = int(self.entry_10.get())
            if m < 2:
                err = 10
        except:
            err = 1
        try:
            n = int(self.entry_11.get())
            if n < 0:
                err = 11
        except:
            err = 2
        try:
            step = float(self.entry_8.get())
        except:
            err = 3
        try:
            xmin = float(self.entry_4.get())
        except:
            err = 4
        try:
            xmax = float(self.entry_5.get()) + step
        except:
            err = 5
        try:
            ymin = float(self.entry_6.get())
        except:
            err = 6
        try:
            ymax = float(self.entry_7.get()) + step
        except:
            err = 7
        
        inputmethod = self.var1.get()
        if self.var1.get() == 0:
            rlist = self.entry_1.get().split(',')
            inp = []
            for x in rlist:
                try:
                    inp.append(complex(x))
                except:
                    err = 8
        else:
            clist = self.entry_2.get().split(',')
            inp = []
            for x in clist:
                try:
                    inp.append(complex(x))
                except:
                    err = 9
        if err != 0:
            return (0,err)
        return inputmethod,inp,m,n,xmin,xmax,ymin,ymax,step,err

    def basins(self):
        param = self.getParameters()
        if param[-1] != 0:
            messagebox.showerror("Error",\
                                        "Error code: " + \
                                 str(param[-1])+". See \
documentation for more info.")
            return
        if param[0] == 0:
            PLOT.basinAttr(param[1],param[2],param[3],param[4],\
                           param[5],param[6],param[7],param[8])
        else:
            PLOT.basinAttr2(param[1],param[2],param[3],param[4],\
                           param[5],param[6],param[7],param[8])

    def basic(self):
        param = self.getParameters()
        if param[0] == 0:
            PLOT.interBasicSeq2(param[1],param[3],param[4],\
                                param[5],param[6],param[7])
        else:
            PLOT.interBasicSeq(param[1],param[3],param[4],\
                                param[5],param[6],param[7])

    def orbit(self):
        param = self.getParameters()
        if param[0] == 0:
            PLOT.interOrbit2(param[1],param[2],param[3],\
                             param[4],param[5],param[6],param[7])
        else:
            PLOT.interOrbit(param[1],param[2],param[3],\
                            param[4],param[5],param[6],param[7])
            
root = Tk()
root.title("Polynomiography GUI")
root.resizable(width=FALSE, height=FALSE)
app = App(root)
root.mainloop()
